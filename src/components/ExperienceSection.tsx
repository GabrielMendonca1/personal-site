import Image from 'next/image';

import type { Dictionary } from '@/i18n/types';

type ExperienceSectionProps = {
  content: Dictionary['experience'];
};

export default function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section className="bg-[var(--background)] min-h-[100dvh] text-[var(--text-primary)] flex p-8 items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="">
          <h2 className="text-[var(--text-primary)] text-lg font-bold mb-6">{content.sectionTitle}</h2>

          <div className="space-y-8">
            {content.entries.map((entry) => (
              <div key={`${entry.company}-${entry.period}`}>
                <div className="mb-1">
                  {entry.companyHref ? (
                    <a
                      href={entry.companyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-wrap items-center gap-2 text-[16px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      <span>{entry.company}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {entry.logo?.src ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full p-1">
                            <Image
                              src={entry.logo.src}
                              alt={entry.logo.alt}
                              width={16}
                              height={16}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        ) : null}
                        {entry.country?.src ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full p-1">
                            <Image
                              src={entry.country.src}
                              alt={entry.country.alt}
                              width={16}
                              height={16}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        ) : null}
                      </div>
                    </a>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 text-[16px] text-[var(--text-secondary)]">
                      <span>{entry.company}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {entry.logo?.src ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full p-1">
                            <Image
                              src={entry.logo.src}
                              alt={entry.logo.alt}
                              width={16}
                              height={16}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        ) : null}
                        {entry.country?.src ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
                            <Image
                              src={entry.country.src}
                              alt={entry.country.alt}
                              width={16}
                              height={16}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-[var(--text-muted)] text-[14px] mb-1">{entry.period}</div>
                <div className="text-[var(--text-secondary)] text-[14px] mb-2 font-medium">{entry.role}</div>
                {entry.description ? (
                  <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
