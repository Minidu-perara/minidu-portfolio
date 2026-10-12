import type { CSSProperties } from "react";
import { FiCheck, FiLock, FiShoppingCart, FiSun, FiToggleRight } from "react-icons/fi";

/*
 * Small, decorative previews of what each service looks like in use. Plain
 * markup and CSS (no images or scripts), hidden from screen readers since
 * the tile text says the same thing. Each one acts its service out (the
 * svc-* animations in globals.css); the tiles wrap them in PlayWhenVisible,
 * so they pause off screen and stay still for reduced motion.
 */

const frame = "rounded-2xl bg-navy-deep/80 ring-1 ring-white/8";
const order = (i: number) => ({ "--i": i }) as CSSProperties;

const products = [
  { name: "Smart lock", price: "Rs 18,500", icon: FiLock, art: "from-violet/45 via-signal-deep/25 to-navy text-violet" },
  { name: "LED bulb", price: "Rs 650", icon: FiSun, art: "from-sun/50 via-alert/20 to-navy text-sun" },
  { name: "Wall switch", price: "Rs 1,200", icon: FiToggleRight, art: "from-pulse/40 via-ok/15 to-navy text-pulse" },
];

export function StorePreview() {
  return (
    <div aria-hidden className={`${frame} overflow-hidden`}>
      <div className="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 rounded-full bg-white/[0.06] px-2.5 py-0.5 font-mono text-[0.62rem] text-ink-2">yourshop.lk</span>
        <span className="ml-auto flex items-center gap-1 text-[0.62rem] text-ink-2">
          <FiShoppingCart className="size-3.5" />
          <span className="svc-bump grid size-4 place-items-center rounded-full bg-sun text-[0.55rem] font-bold text-void">3</span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map(({ name, price, icon: Icon, art }, i) => (
          <div key={name} className="svc-pick rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/6" style={order(i)}>
            <div className={`grid aspect-[4/3] place-items-center rounded-lg bg-linear-to-br sm:aspect-[2/1] ${art}`}>
              <Icon className="size-5" />
            </div>
            <p className="mt-2 truncate text-[0.7rem] font-medium text-ink">{name}</p>
            <p className="text-[0.66rem] text-ink-2">{price}</p>
            <p className="svc-press mt-1.5 rounded-md bg-sun py-1 text-center text-[0.6rem] font-semibold text-void" style={order(i)}>
              Add to cart
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const stock = [
  { name: "Wall switch", level: 0.82, count: 412 },
  { name: "LED bulb 9W", level: 0.56, count: 268 },
  { name: "Smart lock", level: 0.12, count: 6, low: true },
];

export function StockPreview() {
  return (
    <div aria-hidden className={`${frame} space-y-3 p-4`}>
      {stock.map((row, i) => (
        <div key={row.name}>
          <div className="flex items-center justify-between gap-2 text-[0.72rem]">
            <span className="font-medium text-ink">{row.name}</span>
            <span className="flex items-center gap-1.5 text-ink-2 tabular-nums">
              {row.low && <span className="svc-blink rounded-full bg-sun px-1.5 py-px text-[0.6rem] font-semibold text-void">Low</span>}
              {row.count}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className={`svc-fill h-full rounded-full ${row.low ? "bg-sun" : "bg-ok/70"}`}
              style={{ width: `${row.level * 100}%`, ...order(i) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChatPreview() {
  return (
    <div aria-hidden className={`${frame} space-y-2 p-3 text-[0.72rem] leading-snug`}>
      <p className="svc-chat-q ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-violet px-3 py-2 text-void">
        Do you have 3-pin plugs in stock?
      </p>
      {/* The answer and the "thinking" dots share one spot. */}
      <div className="grid">
        <p className="svc-chat-typing flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.07] px-3 py-3 [grid-area:1/1]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-ink-2" style={order(i)} />
          ))}
        </p>
        <p className="svc-chat-a w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3 py-2 text-ink [grid-area:1/1]">
          Yes, 48 in stock at Rs 350 each. Shall I reserve some for you?
        </p>
      </div>
    </div>
  );
}

export function DevicePreview() {
  return (
    <div aria-hidden className={`${frame} p-3`}>
      <div className="flex items-center justify-between text-[0.72rem]">
        <span className="font-medium text-ink">Cold room</span>
        <span className="flex items-center gap-1.5 text-ok">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-ok" />
            <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
          </span>
          Online
        </span>
      </div>
      <div className="mt-1 flex items-end justify-between gap-3">
        <span className="text-2xl font-bold tracking-tight text-ink tabular-nums">4.2°C</span>
        <svg viewBox="0 0 120 32" className="h-8 w-28 text-pulse" fill="none">
          <path
            className="svc-trace"
            pathLength={1}
            d="M0 22 L12 18 L24 20 L36 12 L48 15 L60 9 L72 14 L84 11 L96 16 L108 10 L120 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

const health = [
  { label: "Website", value: "Online", ok: true },
  { label: "Last backup", value: "Today, 2:00 AM", ok: true },
  { label: "Business email", value: "you@yourshop.lk", ok: true },
];

export function CloudPreview() {
  return (
    <div aria-hidden className={`${frame} divide-y divide-white/6 px-3 text-[0.72rem]`}>
      {health.map((row, i) => (
        <div key={row.label} className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-ink-2">{row.label}</span>
          <span className="flex items-center gap-1.5 font-medium text-ink">
            {row.ok && <FiCheck className="svc-tick size-3.5 text-ok" style={order(i)} />}
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const links = ["Card payments", "SMS alerts", "WhatsApp", "Couriers", "Accounting"];

export function ConnectPreview() {
  return (
    <div aria-hidden className={`${frame} flex flex-wrap items-center gap-2 p-3`}>
      <span className="svc-node rounded-full bg-sun px-3 py-1.5 text-[0.72rem] font-semibold text-void" style={order(0)}>
        Your system
      </span>
      {links.map((link, i) => (
        <span key={link} className="flex items-center gap-2 text-[0.72rem] text-ink">
          <span className="svc-wire h-px w-3 border-t border-dashed border-sun/60" style={order(i + 1)} />
          <span className="svc-node rounded-full bg-white/[0.06] px-3 py-1.5 ring-1 ring-white/8" style={order(i + 1)}>
            {link}
          </span>
        </span>
      ))}
    </div>
  );
}
