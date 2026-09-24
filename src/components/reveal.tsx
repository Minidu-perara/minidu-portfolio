"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the element that must be visible before it animates in. */
  threshold?: number;
};

/**
 * Fades and slides its children in the first time they scroll into view.
 * Users who prefer reduced motion see the content immediately, and a
 * <noscript> rule in the root layout keeps it visible without JavaScript.
 */
export function Reveal({ children, className = "", threshold = 0.4 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    // Observe the untransformed wrapper: the hidden state's offset would
    // otherwise push the element partly out of view and delay the trigger.
    <div ref={ref} className={className}>
      <div
        data-reveal={visible ? "shown" : "hidden"}
        className="transition duration-800 ease-out motion-safe:data-[reveal=hidden]:translate-y-15 motion-safe:data-[reveal=hidden]:opacity-0"
      >
        {children}
      </div>
    </div>
  );
}
