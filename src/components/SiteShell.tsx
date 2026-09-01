"use client";

import { useEffect, useState } from "react";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored) {
      setDark(stored === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className={`site-shell${dark ? " dark" : ""}`}>
      <div className="page-column">
        <header className="simple-header">
          <a className="site-name" href="#top" aria-label="Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="site-icon"
              src="/scanline-portrait.png"
              alt=""
            />
          </a>
          <nav aria-label="Main navigation">
            <button aria-label="Toggle color theme" onClick={toggle}>
              {dark ? "☀" : "☾"}
            </button>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
