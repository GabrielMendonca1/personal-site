import type { Dictionary } from '@/i18n/types';

type ExperienceSectionProps = {
  content: Dictionary['experience'];
};

export default function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section className="bg-[var(--background)] text-[var(--text-primary)] flex items-center justify-center py-20 p-8">
      <div className="max-w-4xl w-full">
        <div className="max-w-2xl">
          <h2 className="text-[var(--text-primary)] text-lg font-bold mb-6">{content.sectionTitle}</h2>

          <div className="space-y-8">
            {content.entries.map((entry) => (
              <div key={`${entry.company}-${entry.period}`}>
                <div className="text-[var(--text-secondary)] text-[16px] mb-1">{entry.company}</div>
                <div className="text-[var(--text-muted)] text-[14px] mb-1">{entry.period}</div>
                <div className="text-[var(--text-secondary)] text-[14px] mb-2 font-medium">{entry.role}</div>
                <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
