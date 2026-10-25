import type { ReactNode } from "react";

type Props = { href: string; variant?: "primary" | "frost"; className?: string; children: ReactNode };

/** Pill link button: white primary, or frosted secondary on the spectrum field. */
export function Button({ href, variant = "primary", className = "", children }: Props) {
  return (
    <a className={`btn btn-${variant} ${className}`.trim()} href={href}>
      {children}
    </a>
  );
}
