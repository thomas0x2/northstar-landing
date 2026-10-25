import type { ReactNode } from "react";

type Props = { href: string; variant?: "primary" | "frost" | "text"; className?: string; children: ReactNode };

/** Pill link button: white primary, frosted secondary, or free-floating text
    that only shows the glass sheet on hover. */
export function Button({ href, variant = "primary", className = "", children }: Props) {
  return (
    <a className={`btn btn-${variant} ${className}`.trim()} href={href}>
      {children}
    </a>
  );
}
