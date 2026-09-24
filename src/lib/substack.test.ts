import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFeed } from "./substack.ts";

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title><![CDATA[Minidu]]></title>
  <item>
    <title><![CDATA[Older post: lessons from IoT]]></title>
    <description><![CDATA[<p>Sensor calibration &amp; dashboards</p>]]></description>
    <link>https://minidu.substack.com/p/older</link>
    <pubDate>Tue, 09 Jul 2024 10:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Tom &amp; Jerry&#8217;s &#x201C;guide&#x201D;</title>
    <description>Plain &lt;b&gt;text&lt;/b&gt;</description>
    <link>https://minidu.substack.com/p/newer</link>
    <pubDate>Wed, 10 Jul 2024 10:00:00 GMT</pubDate>
  </item>
  <item><title>Unsafe link</title><link>javascript:alert(1)</link><pubDate>Wed, 10 Jul 2024 10:00:00 GMT</pubDate></item>
  <item><title>Bad date</title><link>https://example.com/p</link><pubDate>not a date</pubDate></item>
</channel></rss>`;

test("parses items newest first, with CDATA and entities decoded", () => {
  const posts = parseFeed(feed);
  assert.deepEqual(
    posts.map((p) => [p.title, p.excerpt, p.date]),
    [
      ["Tom & Jerry’s “guide”", "Plain text", "2024-07-10T10:00:00.000Z"],
      ["Older post: lessons from IoT", "Sensor calibration & dashboards", "2024-07-09T10:00:00.000Z"],
    ],
  );
});

test("drops items with non-https links or invalid dates", () => {
  const titles = parseFeed(feed).map((p) => p.title);
  assert.ok(!titles.includes("Unsafe link"));
  assert.ok(!titles.includes("Bad date"));
});

test("returns nothing for input that is not a feed", () => {
  assert.deepEqual(parseFeed("<html>not a feed</html>"), []);
});
