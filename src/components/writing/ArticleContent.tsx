import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="writing-callout" aria-label={title ?? "Note"}>
      {title && <p className="writing-callout-title">{title}</p>}
      <div>{children}</div>
    </aside>
  );
}

export function DraftNote({ title = "Editorial note", children }: { title?: string; children: ReactNode }) {
  return (
    <details className="writing-draft-note">
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  );
}

export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="writing-figure">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export const mdxElements = {
  a: (props: ComponentPropsWithoutRef<"a">) => <a {...props} />,
  Callout,
  Figure,
};
