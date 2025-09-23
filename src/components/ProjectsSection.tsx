import type { Dictionary } from '@/i18n/types';

type ProjectsSectionProps = {
  content: Dictionary['projects'];
};

export default function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section className="bg-[var(--background)] text-[var(--text-primary)] flex items-center justify-center py-20 p-8">
      <div className="max-w-4xl w-full">
        <div className="max-w-3xl">
          <h2 className="text-[var(--text-primary)] text-lg font-bold mb-6">{content.sectionTitle}</h2>

          <div className="space-y-16">
            {content.entries.map((project) => (
              <div key={project.name} className="space-y-6">
                <div className="w-full h-80 bg-[var(--surface)] rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 w-4/5 h-4/5 flex items-center justify-center">
                      <div className="text-white/80 text-center">
                        <div className="text-6xl mb-4" aria-hidden="true">💻</div>
                        <div className="text-sm">{project.imageryLabel}</div>
                      </div>
                    </div>
                  </div>
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

                    {project.primaryActionHref ? (
                      <a
                        href={project.primaryActionHref}
                        target={project.primaryActionHref.startsWith('http') ? '_blank' : undefined}
                        rel={project.primaryActionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="bg-[var(--text-primary)] text-[var(--background)] px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                      >
                        {project.primaryActionLabel}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      <button
                        type="button"
                        value={project.primaryActionLabel}
                        className="bg-[var(--text-primary)] text-[var(--background)] px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                      >
                        {project.primaryActionLabel}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
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
