import SiteShell from "@/components/SiteShell";

type Entry = {
  period: string;
  title: string;
  logo?: { src: string; invert?: boolean };
  body: React.ReactNode;
  links?: { label: string; href: string }[];
};

const timeline: Entry[] = [
  {
    period: "2025 - Present",
    title: "ARCA",
    logo: { src: "/logos/arca.svg", invert: true },
    body: (
      <>
        Deep tech startup I founded to implement AI sustainably and
        scalably.
        We build customized solutions for B2B and B2C companies across two
        countries.
      </>
    ),
    links: [{ label: "arcatech.com.br", href: "https://arcatech.com.br/" }],
  },
  {
    period: "Apr 2026 - Present",
    title: "Accenture",
    logo: { src: "/logos/accenture.svg" },
    body: (
      <>
        SAP Software Architect for manufacturing systems at{" "}
        <a
          className="inline-link"
          href="https://www.accenture.com/"
          target="_blank"
          rel="noreferrer"
        >
          Accenture
        </a>
        . Cloud architecture and scalable solutions on SAP BTP, with a strong
        focus on AI-driven innovation in the manufacturing space.
      </>
    ),
    links: [{ label: "accenture.com", href: "https://www.accenture.com/" }],
  },
  {
    period: "Jan 2026 - Mar 2026",
    title: "SYSTEMA",
    logo: { src: "/logos/systema.svg" },
    body: (
      <>
        Full-stack developer at{" "}
        <a
          className="inline-link"
          href="https://www.systema.com/"
          target="_blank"
          rel="noreferrer"
        >
          SYSTEMA
        </a>
        , building applications in the SAP ecosystem: CAP/CDS backends,
        UI5/Fiori interfaces, PostgreSQL/HANA, SAP BTP and Digital
        Manufacturing.
      </>
    ),
    links: [{ label: "systema.com", href: "https://www.systema.com/" }],
  },
  {
    period: "2024 - 2025",
    title: "SYSTEMA - Trainee",
    logo: { src: "/logos/systema.svg" },
    body: (
      <>
        Worked on projects for major industrial companies, learning directly
        from highly experienced engineers — from legacy systems to modern
        applications for automation and manufacturing.
      </>
    ),
    links: [{ label: "systema.com", href: "https://www.systema.com/" }],
  },
  {
    period: "2021 - 2026",
    title: "Software Engineering at UCSAL",
    body: (
      <>
        Software Engineering degree at{" "}
        <a
          className="inline-link"
          href="https://www.ucsal.br/"
          target="_blank"
          rel="noreferrer"
        >
          Universidade Católica do Salvador
        </a>
        .
      </>
    ),
    links: [{ label: "ucsal.br", href: "https://www.ucsal.br/" }],
  },
  {
    period: "2021 - 2023",
    title: "HarvardX CS50x",
    body: (
      <>
        Completed Harvard&apos;s intensive introduction to computer science —
        the foundation of how I think about problems.
      </>
    ),
    links: [{ label: "cs50.harvard.edu", href: "https://cs50.harvard.edu/x/" }],
  },
  {
    period: "2021 - 2024",
    title: "WG",
    body: (
      <>
        Freelance developer for{" "}
        <a
          className="inline-link"
          href="https://www.wg.com.br/"
          target="_blank"
          rel="noreferrer"
        >
          WG
        </a>
        , a footwear sales rep with 30+ years in the
        market. Built the company&apos;s back end for data and invoice
        management, developing my cloud skills along the way.
      </>
    ),
  },
];

export default function Home() {
  return (
    <SiteShell>
      <main id="top" className="simple-main">
        <section className="about" aria-label="About Gabriel Mendonça">
          <p className="about-lede">
            <strong>Gabriel</strong> is a Software and AI Engineer from
            Salvador, Brazil.
          </p>
          <p>
            I&apos;m building applied AI systems for the real world.
          </p>
          <div className="socials">
            <a
              href="https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/GabrielMendonca1"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:gabriel@arc-corporation.com">Email</a>
          </div>
        </section>
        <section
          className="timeline-section"
          id="timeline"
          aria-label="Timeline"
        >
          <div className="section-label">
            <span>Timeline</span>
            <span>now - 2021</span>
          </div>
          <div className="timeline-list">
            {timeline.map((entry) => (
              <article className="timeline-entry" key={entry.title}>
                <div className="entry-meta">
                  <span>{entry.period}</span>
                </div>
                <div className="entry-copy">
                  <div className="entry-title">
                    {entry.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={`entry-logo${
                          entry.logo.invert ? " entry-logo--invert" : ""
                        }`}
                        src={entry.logo.src}
                        alt=""
                      />
                    )}
                    <span>{entry.title}</span>
                  </div>
                  <p>{entry.body}</p>
                  {entry.links?.map((link) => (
                    <a
                      className="entry-link"
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="simple-footer">
        <div className="signature-backdrop" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/signature_black_raster.svg" alt="" />
        </div>
      </footer>
    </SiteShell>
  );
}
