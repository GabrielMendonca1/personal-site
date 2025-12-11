import type { Dictionary } from '@/i18n/types';
import Image from 'next/image';

type ProjectsSectionProps = {
  content: Dictionary['projects'];
};

export default function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section className="bg-[var(--background)] mb-[10%] text-[var(--text-primary)] p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="">
          <h2 className="text-[var(--text-primary)] text-lg font-bold mb-6">{content.sectionTitle}</h2>

          <div className="space-y-16">
            {content.entries.map((project) => (
              <div key={project.name} className="space-y-6">
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[var(--surface)]">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1440px) 864px, 100vw"
                      priority
                    />
                  </div>

                <div className="space-y-4 mb-9">
                  <h3 className="text-[var(--text-primary)] text-xl font-bold">{project.name}</h3>

                  <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 bg-[var(--surface)] text-[var(--text-secondary)] text-xs rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Disabled action button removed per request */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
