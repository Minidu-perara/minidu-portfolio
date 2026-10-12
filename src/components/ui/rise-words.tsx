import type { CSSProperties } from "react";

/**
 * Heading text whose words rise into place one after another when the
 * surrounding Reveal shows (see .rise-word in globals.css). Shared by every
 * section heading, so both pages introduce themselves the same way.
 */
export function RiseWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      <span className="rise-word">
        <span style={{ "--w": i } as CSSProperties}>{word}</span>
      </span>{" "}
    </span>
  ));
}
