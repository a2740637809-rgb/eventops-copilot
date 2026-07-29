import type { ReactNode } from "react";

type Tone = "synthetic" | "warning" | "success" | "neutral";

export function StatusPill({
  tone,
  children,
}: {
  tone: Tone;
  children: ReactNode;
}) {
  return (
    <span className={`status-pill status-pill--${tone}`} data-tone={tone}>
      <span aria-hidden="true" className="status-pill__dot" />
      {children}
    </span>
  );
}
