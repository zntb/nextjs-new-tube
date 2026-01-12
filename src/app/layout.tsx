import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { TRPCProvider } from '@/trpc/client';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'NewTube - Watch, Share, and Discover Videos',
    template: '%s | NewTube',
  },
  description:
    'NewTube is a modern video platform where you can watch, share, and discover amazing content from creators around the world.',
  keywords: [
    'videos',
    'streaming',
    'entertainment',
    'content',
    'creators',
    'watch videos',
    'video sharing',
  ],
  authors: [{ name: 'NewTube Team' }],
  creator: 'NewTube',
  publisher: 'NewTube',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextjs-new-tube.vercel.app',
    title: 'NewTube - Watch, Share, and Discover Videos',
    description:
      'NewTube is a modern video platform where you can watch, share, and discover amazing content from creators around the world.',
    siteName: 'NewTube',
    images: [
      {
        url: '/logo.svg',
        width: 90,
        height: 60,
        alt: 'NewTube Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewTube - Watch, Share, and Discover Videos',
    description:
      'NewTube is a modern video platform where you can watch, share, and discover amazing content from creators around the world.',
    images: ['/logo.svg'],
    creator: '@zntbdev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nextjs-new-tube.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <TRPCProvider>
              <Toaster />
              {children}
            </TRPCProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
