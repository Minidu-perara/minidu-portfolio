"use client";

import { useEffect, useState } from "react";
import { formatClock } from "@/lib/timezones";

/** Live wall-clock time in a time zone. Renders "--:--" until mounted. */
export function LocalTime({ timeZone, seconds = false, className = "" }: { timeZone: string; seconds?: boolean; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, seconds ? 1000 : 10_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [seconds]);

  return (
    <time className={`tabular-nums ${className}`} dateTime={now?.toISOString()}>
      {now ? formatClock(timeZone, now, seconds) : seconds ? "--:--:--" : "--:--"}
    </time>
  );
}
