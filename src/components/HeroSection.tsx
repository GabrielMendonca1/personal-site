import Image from 'next/image';

import Signature from './Signature';
import type { Dictionary } from '@/i18n/types';

type HeroSectionProps = {
  content: Dictionary['hero'];
};

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="bg-[var(--background)] text-[var(--text-primary)] relative overflow-hidden">
      <div className="flex items-center justify-center p-8 min-h-[100dvh]">
        <div className="max-w-3xl w-full flex items-center justify-between relative">
          <div className="flex-1 max-w-lg">
            <div className="mb-10">
              <div className="w-24 h-24 md:w-[124px] md:h-[124px] bg-[var(--surface)] rounded-full mb-2 flex items-center justify-center overflow-hidden">
                {content.avatarImage ? (
                  <Image
                    src={content.avatarImage.src}
                    alt={content.avatarImage.alt}
                    width={82}
                    height={82}
                    className="h-full w-full object-cover"
                    priority
                  />
                ) : (
                  <svg
                    className="w-8 h-8 text-[var(--text-muted)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label={content.avatarLabel}
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>

              <div className="mb-4">
                <Signature className="w-14 h-20" alt={content.signatureAlt} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <span className="h-[4px] w-[50px] bg-[var(--text-primary)] rounded-full"></span>
                  <span className="h-[4px] w-[70px] bg-[var(--text-primary)] rounded-full"></span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="h-[4px] w-[50px] bg-[var(--text-secondary)] rounded-full"></span>
                  <span className="h-[4px] w-[40px] bg-[var(--text-secondary)] rounded-full"></span>
                  <span className="h-[4px] w-[60px] bg-[var(--text-secondary)] rounded-full"></span>
                  <span className="h-[4px] w-[40px] bg-[var(--text-secondary)] rounded-full"></span>
                  <span className="h-[4px] w-[80px] bg-[var(--text-secondary)] rounded-full"></span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="h-[4px] w-[20px] bg-[var(--text-muted)] rounded-full"></span>
                  <span className="h-[4px] w-[40px] bg-[var(--text-muted)] rounded-full"></span>
                  <span className="h-[4px] w-[30px] bg-[var(--text-muted)] rounded-full"></span>
                  <span className="h-[4px] w-[50px] bg-[var(--text-muted)] rounded-full"></span>
                  <span className="h-[4px] w-[68px] bg-[var(--text-muted)] rounded-full"></span>
                  <span className="h-[4px] w-[100px] bg-[var(--text-muted)] rounded-full"></span>
                </div>
              </div>

            </div>

            <div>
              {/* <h2 className="text-[var(--text-primary)] text-lg font-bold mb-6">{content.sectionTitle}</h2> */}
              <div className="space-y-4 text-[15px] text-[var(--text-muted)] leading-relaxed">
                {content.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
