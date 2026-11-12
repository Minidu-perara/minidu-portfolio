"use client";

import { useEffect, useState, type ReactNode } from "react";

// The first page of a visit appears at once; only later navigations animate.
let visited = false;

/**
 * Wraps every page. Next remounts a template on each navigation, so moving
 * between pages (home, /services, a case study) fades the new one in
 * instead of cutting to it.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => visited);
  useEffect(() => {
    visited = true;
  }, []);
  return <div className={`flex flex-1 flex-col ${animate ? "motion-safe:animate-page-in" : ""}`}>{children}</div>;
}
