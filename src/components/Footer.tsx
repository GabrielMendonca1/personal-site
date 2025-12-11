import Link from 'next/link';
import LocaleSelector from './LocaleSelector';
import Signature from './Signature';
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Signature */}
          <div className="flex flex-col items-center lg:col-span-12">
            <Link href="/" className="w-fit" aria-label="Go to homepage">
              <Signature className="w-50 opacity-3 transition-opacity hover:opacity-10" alt="Signature" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-[var(--border)]/60 pt-8 md:flex-row">
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
