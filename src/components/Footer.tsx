import type { Dictionary } from '@/i18n/types';

type FooterProps = {
  content: Dictionary['footer'];
};

export default function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="bg-[var(--background)] px-8 pb-20 pt-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <span className="text-xs text-[var(--text-muted)]">
          {content.copyright.replace('{year}', currentYear)}
        </span>
      </div>
    </footer>
  );
}
