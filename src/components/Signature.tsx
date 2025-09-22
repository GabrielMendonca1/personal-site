'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function Signature({
  className,
  alt,
}: {
  className?: string;
  alt: string;
}) {
  const { theme } = useTheme();

  const signatureSrc = theme === 'light'
    ? '/signature_black_raster.svg'
    : '/signature_white_raster.svg';

  return (
    <img
      src={signatureSrc}
      alt={alt}
      className={className}
    />
  );
}
