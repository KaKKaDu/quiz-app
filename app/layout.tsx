import type { Metadata } from 'next';
import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import { Header } from '@/templates/components/layout/header';
import { cn } from '@/lib/utils/cn';
import { ThemeProvider } from '@/templates/components/layout/theme-provider';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Quiz app for friends to create quizzes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', 'font-mono', jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
