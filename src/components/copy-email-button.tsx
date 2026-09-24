"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { iconButton } from "@/components/ui/styles";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked (permissions, insecure context); the
      // address stays visible and the mailto link still works.
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={iconButton} aria-label="Copy email address" title="Copy email">
        {copied ? <FiCheck aria-hidden className="size-4 text-emerald-300" /> : <FiCopy aria-hidden className="size-4" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
