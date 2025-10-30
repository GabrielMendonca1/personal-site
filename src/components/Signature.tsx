'use client';

import Image from 'next/image';
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
    <Image
      src={signatureSrc}
      alt={alt}
      width={804}
      height={1092}
      className={className}
      priority={false}
    />
  );
}
