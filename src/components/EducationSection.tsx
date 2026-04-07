import type { Dictionary } from '@/i18n/types';

type EducationSectionProps = {
  content: Dictionary['education'];
};

export default function EducationSection({ content }: EducationSectionProps) {
  return (
    <section className="bg-[var(--background)] min-h-[100dvh] text-[var(--text-primary)] flex items-center p-8 justify-center">
      <div className="max-w-3xl w-full">
        <div className="">
          <h2 className="text-[var(--text-primary)] text-lg font-bold mb-6">{content.sectionTitle}</h2>

          <div className="space-y-8">
            {content.entries.map((entry) => (
              <div key={`${entry.institution}-${entry.period}`}>
                <div className="text-[var(--text-secondary)] text-[16px] mb-1">{entry.institution}</div>
                <div className="text-[var(--text-muted)] text-[14px] mb-1">{entry.period}</div>
                <div className="text-[var(--text-secondary)] text-[14px] mb-2 font-medium">{entry.degree}</div>
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
