/** Offset from UTC, in minutes, of an IANA time zone at a given instant. */
export function utcOffsetMinutes(timeZone: string, at: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(at);
  const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  const wallClockAsUtc = Date.UTC(
    part("year"),
    part("month") - 1,
    part("day"),
    part("hour"),
    part("minute"),
    part("second"),
  );
  return Math.round((wallClockAsUtc - at.getTime()) / 60_000);
}

/**
 * Hours shared by two working days (default 09:00–18:00 local) in places whose
 * UTC offsets differ by `diffMinutes`. Wraps around midnight, so a 20-hour
 * difference counts as 4.
 */
export function workdayOverlapHours(diffMinutes: number, dayStart = 9, dayEnd = 18): number {
  const day = 24 * 60;
  const wrapped = ((diffMinutes % day) + day) % day;
  const distance = Math.min(wrapped, day - wrapped) / 60;
  return Math.max(0, dayEnd - dayStart - distance);
}

/** "+2h 30m", "−4h", or "Same time" for a difference in minutes. */
export function formatOffsetDiff(diffMinutes: number): string {
  if (diffMinutes === 0) return "Same time";
  const sign = diffMinutes > 0 ? "+" : "−";
  const abs = Math.abs(diffMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return `${sign}${hours}h${minutes ? ` ${minutes}m` : ""}`;
}

/** 24-hour "HH:MM" (or "HH:MM:SS") wall-clock time in a time zone. */
export function formatClock(timeZone: string, at: Date = new Date(), withSeconds = false): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hourCycle: "h23",
  }).format(at);
}
