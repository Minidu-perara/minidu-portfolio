"use client";

import { useEffect, useState } from "react";
import type { Place } from "@/content/profile";
import { formatClock, formatOffsetDiff, utcOffsetMinutes, workdayOverlapHours } from "@/lib/timezones";

type Row = { name: string; time: string; diff: string; overlap: number };

function rowsAt(home: Place, cities: Place[], now: Date): Row[] {
  const homeOffset = utcOffsetMinutes(home.timeZone, now);
  return cities.map((city) => {
    const diff = utcOffsetMinutes(city.timeZone, now) - homeOffset;
    return { name: city.name, time: formatClock(city.timeZone, now), diff: formatOffsetDiff(diff), overlap: workdayOverlapHours(diff) };
  });
}

/** Live local time and shared working hours (9–6) between Colombo and each city. */
export function TimezoneOverlap({ home, cities }: { home: Place; cities: Place[] }) {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    const update = () => setRows(rowsAt(home, cities, new Date()));
    const first = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [home, cities]);

  return (
    <div>
      <p className="label-mono text-[0.62rem] text-ink-3">Shared hours with a 9–6 day in {home.name}</p>
      <ul className="mt-3 divide-y divide-white/6 rounded-2xl bg-white/[0.025] px-4 ring-1 ring-white/8">
        {cities.map((city, i) => {
          const row = rows?.[i];
          return (
            <li key={city.name} className="grid grid-cols-[minmax(0,1fr)_3.2rem_4.6rem] items-center gap-3 py-2.5 text-sm sm:grid-cols-[minmax(0,1fr)_3.4rem_5rem_5.5rem]">
              <span className="truncate text-ink">{city.name}</span>
              <span className="font-mono text-xs text-ink-2 tabular-nums">{row?.time ?? "--:--"}</span>
              <span className="hidden font-mono text-xs text-ink-3 sm:block">{row?.diff ?? ""}</span>
              <span className="flex items-center justify-end gap-2">
                <span aria-hidden className="h-1 w-10 overflow-hidden rounded-full bg-white/8">
                  <span
                    className="block h-full rounded-full bg-linear-to-r from-pulse to-signal transition-[width] duration-700"
                    style={{ width: `${((row?.overlap ?? 0) / 9) * 100}%` }}
                  />
                </span>
                <span className="w-9 text-right font-mono text-xs text-ink-2 tabular-nums">{row ? `${row.overlap}h` : ""}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
