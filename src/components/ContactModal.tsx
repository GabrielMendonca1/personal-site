'use client';

import { useEffect, useState } from 'react';
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

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { dictionary } = useTranslations();
  const contact = dictionary.contact;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow || 'unset';
      };
    }

    document.body.style.overflow = 'unset';
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (!isOpen) {
      return undefined;
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={contact.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <div
        className="relative z-10 bg-[var(--background)] border border-[var(--border)] rounded-lg p-8 max-w-md w-full shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6">
          <h2 className="text-[var(--text-primary)] text-xl font-bold">{contact.title}</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">{contact.emailLabel}</h3>
              <a
                href={`mailto:${contact.emailValue}`}
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {contact.emailValue}
              </a>
            </div>

            <div>
              <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">{contact.linkedinLabel}</h3>
              <a
                href={ensureExternalHref(contact.linkedinValue)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {contact.linkedinText ?? contact.linkedinLabel}
              </a>
            </div>

            <div>
              <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">{contact.githubLabel}</h3>
              <a
                href={ensureExternalHref(contact.githubValue)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {contact.githubText ?? contact.githubLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
