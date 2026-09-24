import assert from "node:assert/strict";
import { test } from "node:test";
import { formatClock, formatOffsetDiff, utcOffsetMinutes, workdayOverlapHours } from "./timezones.ts";

test("utcOffsetMinutes handles fixed and daylight-saving zones", () => {
  const january = new Date("2026-01-15T12:00:00Z");
  const july = new Date("2026-07-15T12:00:00Z");
  assert.equal(utcOffsetMinutes("Asia/Colombo", january), 330);
  assert.equal(utcOffsetMinutes("Asia/Colombo", july), 330);
  assert.equal(utcOffsetMinutes("Europe/London", january), 0);
  assert.equal(utcOffsetMinutes("Europe/London", july), 60);
  assert.equal(utcOffsetMinutes("Australia/Sydney", january), 660);
  assert.equal(utcOffsetMinutes("America/New_York", july), -240);
});

test("workdayOverlapHours measures shared 9–6 hours, wrapping past midnight", () => {
  assert.equal(workdayOverlapHours(0), 9);
  assert.equal(workdayOverlapHours(150), 6.5); // Singapore vs Colombo
  assert.equal(workdayOverlapHours(-270), 4.5); // London (summer) vs Colombo
  assert.equal(workdayOverlapHours(-600), 0); // 10 hours apart
  assert.equal(workdayOverlapHours(1200), 5); // 20 hours ahead is 4 hours behind
});

test("formatOffsetDiff reads naturally", () => {
  assert.equal(formatOffsetDiff(0), "Same time");
  assert.equal(formatOffsetDiff(150), "+2h 30m");
  assert.equal(formatOffsetDiff(-270), "−4h 30m");
  assert.equal(formatOffsetDiff(60), "+1h");
});

test("formatClock renders 24-hour wall-clock time", () => {
  const at = new Date("2026-09-25T12:34:56Z");
  assert.equal(formatClock("Asia/Colombo", at), "18:04");
  assert.equal(formatClock("Asia/Colombo", at, true), "18:04:56");
});
