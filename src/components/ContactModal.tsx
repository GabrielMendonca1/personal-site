'use client';

import { useEffect } from 'react';
import { useTranslations } from '@/contexts/TranslationContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { dictionary } = useTranslations();
  const contact = dictionary.contact;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative bg-[var(--background)] border border-[var(--border)] rounded-lg p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
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
                href={`https://${contact.linkedinValue}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {contact.linkedinValue}
              </a>
            </div>

            <div>
              <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">{contact.githubLabel}</h3>
              <a
                href={`https://${contact.githubValue}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {contact.githubValue}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
