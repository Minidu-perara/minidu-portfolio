import { FiCheck, FiLock, FiSun, FiToggleRight } from "react-icons/fi";

/*
 * Small, decorative previews of what each service looks like in use. Plain
 * markup and CSS (no images or scripts), hidden from screen readers since
 * the tile text says the same thing.
 */

const frame = "rounded-2xl bg-void/70 ring-1 ring-white/8";

const products = [
  { name: "Smart lock", price: "Rs 18,500", icon: FiLock },
  { name: "LED bulb", price: "Rs 650", icon: FiSun },
  { name: "Wall switch", price: "Rs 1,200", icon: FiToggleRight },
];

export function StorePreview() {
  return (
    <div aria-hidden className={`${frame} overflow-hidden`}>
      <div className="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 rounded-full bg-white/[0.06] px-2.5 py-0.5 font-mono text-[0.62rem] text-ink-2">yourshop.lk</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map(({ name, price, icon: Icon }) => (
          <div key={name} className="rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/6">
            <div className="grid aspect-[4/3] place-items-center rounded-lg bg-linear-to-br from-sun/25 to-sun/5 text-sun sm:aspect-[2/1]">
              <Icon className="size-5" />
            </div>
            <p className="mt-2 truncate text-[0.7rem] font-medium text-ink">{name}</p>
            <p className="text-[0.66rem] text-ink-2">{price}</p>
            <p className="mt-1.5 rounded-md bg-sun py-1 text-center text-[0.6rem] font-semibold text-void">Add to cart</p>
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
      {stock.map((row) => (
        <div key={row.name}>
          <div className="flex items-center justify-between gap-2 text-[0.72rem]">
            <span className="font-medium text-ink">{row.name}</span>
            <span className="flex items-center gap-1.5 text-ink-2 tabular-nums">
              {row.low && <span className="rounded-full bg-sun px-1.5 py-px text-[0.6rem] font-semibold text-void">Low</span>}
              {row.count}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div className={`h-full rounded-full ${row.low ? "bg-sun" : "bg-ok/70"}`} style={{ width: `${row.level * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChatPreview() {
  return (
    <div aria-hidden className={`${frame} space-y-2 p-3 text-[0.72rem] leading-snug`}>
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-whatsapp/90 px-3 py-2 text-void">Do you have 3-pin plugs in stock?</p>
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3 py-2 text-ink">
        Yes, 48 in stock at Rs 350 each. Shall I reserve some for you?
      </p>
    </div>
  );
}

export function DevicePreview() {
  return (
    <div aria-hidden className={`${frame} p-3`}>
      <div className="flex items-center justify-between text-[0.72rem]">
        <span className="font-medium text-ink">Cold room</span>
        <span className="flex items-center gap-1.5 text-ok">
          <span className="size-1.5 rounded-full bg-ok" />
          Online
        </span>
      </div>
      <div className="mt-1 flex items-end justify-between gap-3">
        <span className="text-2xl font-bold tracking-tight text-ink tabular-nums">4.2°C</span>
        <svg viewBox="0 0 120 32" className="h-8 w-28 text-sun" fill="none">
          <path
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

const links = ["Card payments", "SMS alerts", "WhatsApp", "Couriers", "Accounting"];

export function ConnectPreview() {
  return (
    <div aria-hidden className={`${frame} flex flex-wrap items-center gap-2 p-3`}>
      <span className="rounded-full bg-sun px-3 py-1.5 text-[0.72rem] font-semibold text-void">Your system</span>
      {links.map((link) => (
        <span key={link} className="flex items-center gap-2 text-[0.72rem] text-ink">
          <span className="h-px w-3 border-t border-dashed border-sun/60" />
          <span className="rounded-full bg-white/[0.06] px-3 py-1.5 ring-1 ring-white/8">{link}</span>
        </span>
      ))}
    </div>
  );
}

const health = [
  { label: "Website", value: "Online", ok: true },
  { label: "Last backup", value: "Today, 2:00 AM", ok: true },
  { label: "Business email", value: "you@yourshop.lk" },
];

export function CloudPreview() {
  return (
    <div aria-hidden className={`${frame} divide-y divide-white/6 px-3 text-[0.72rem]`}>
      {health.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-ink-2">{row.label}</span>
          <span className="flex items-center gap-1.5 font-medium text-ink">
            {row.ok && <FiCheck className="size-3.5 text-ok" />}
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
