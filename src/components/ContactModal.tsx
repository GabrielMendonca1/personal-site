'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '@/contexts/TranslationContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ensureExternalHref = (value: string) => {
  if (!value) {
    return '#';
  }
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

// Icons
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.22-.44-2.12-1.61-2.12a1.77 1.77 0 00-1.6 1.15 2.37 2.37 0 00-.09.93V19h-3v-9h2.9v1.3a2.91 2.91 0 012.63-1.45c1.92 0 3.36 1.28 3.36 4.02z" />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ContactRow = ({ 
  icon: Icon, 
  label, 
  value, 
  href, 
  isExternal = false 
}: { 
  icon: React.ElementType, 
  label: string, 
  value: string, 
  href: string,
  isExternal?: boolean 
}) => (
  <a
    href={href}
    target={isExternal ? "_blank" : undefined}
    rel={isExternal ? "noopener noreferrer" : undefined}
    className="group flex items-center p-4 rounded-xl transition-all duration-200 hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] w-full"
  >
    <div className="flex-shrink-0 p-3 rounded-lg bg-[var(--surface)] group-hover:bg-[var(--background)] transition-colors border border-[var(--border)]">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-primary)]" />
    </div>
    <div className="ml-4 flex flex-col min-w-0">
        <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">{label}</span>
        <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)] truncate">{value}</span>
    </div>
    <div className="ml-auto pl-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0 hidden sm:block">
         <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </div>
  </a>
);

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { dictionary } = useTranslations();
  const contact = dictionary.contact;

  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow || 'unset';
      };
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  if (typeof document === 'undefined' || !document.body) {
    return null;
  }

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={contact.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0 transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 bg-[var(--background)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-[var(--text-primary)] text-2xl font-bold tracking-tight">{contact.title}</h2>
            <button
                onClick={onClose}
                className="p-2 -mr-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] rounded-full transition-colors"
                aria-label="Close"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div className="space-y-2">
            <ContactRow 
                icon={MailIcon} 
                label={contact.emailLabel} 
                value={contact.emailValue} 
                href={`mailto:${contact.emailValue}`} 
            />
            
            {contact.businessEmailValue && (
                 <ContactRow 
                    icon={BriefcaseIcon} 
                    label={contact.businessEmailLabel || "Business"} 
                    value={contact.businessEmailValue} 
                    href={`mailto:${contact.businessEmailValue}`} 
                />
            )}

            <ContactRow 
                icon={LinkedInIcon} 
                label={contact.linkedinLabel} 
                value={contact.linkedinText ?? "LinkedIn"} 
                href={ensureExternalHref(contact.linkedinValue)} 
                isExternal
            />

            <ContactRow 
                icon={GitHubIcon} 
                label={contact.githubLabel} 
                value={contact.githubText ?? "GitHub"} 
                href={ensureExternalHref(contact.githubValue)} 
                isExternal
            />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}