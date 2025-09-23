import './globals.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { geistSans, geistMono } from '@/styles/fonts';
import { getRequestLocale } from '@/i18n/getRequestLocale';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
