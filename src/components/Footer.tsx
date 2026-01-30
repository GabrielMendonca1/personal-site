import LocaleSelector from './LocaleSelector';
import type { Dictionary } from '@/i18n/types';

type FooterProps = {
  content: Dictionary['footer'];
  contact: Dictionary['contact'];
};

export default function Footer({ content, contact }: FooterProps) {
  const currentYear = new Date().getFullYear().toString();

  const githubUrl = contact.githubValue.startsWith('http') 
    ? contact.githubValue 
    : `https://${contact.githubValue}`;

  return (
    <footer className="bg-[var(--background)] py-12 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-8">
        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-[var(--border)]/60 pt-8 md:flex-row">
          <p className="text-sm text-[var(--text-muted)]">
            {content.copyright.replace('{year}', currentYear)}
          </p>
          <LocaleSelector />
            <blockquote className="text-sm font-light leading-relaxed text-[var(--text-secondary)]">
              &ldquo;{content.quote.text}&rdquo;
            </blockquote>
        </div>
      </div>
    </footer>
  );
}
