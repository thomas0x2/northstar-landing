import type { ElementType, ReactNode } from "react";

type Props = { as?: ElementType; id?: string; className?: string; children: ReactNode };

/** The exact Northstar spectrum from the logo, as a section background. */
export function SpectrumField({ as: Tag = "section", id, className = "", children }: Props) {
  return (
    <Tag id={id} className={`spectrum ${className}`.trim()}>
      <img className="field" src="/assets/spectrum-field.svg" alt="" aria-hidden="true" />
      {children}
    </Tag>
  );
}
