import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import AuthInit from '@/app/AuthInit';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import QueryProvider from './QueryProvider';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://anokha.amrita.edu';

export const metadata: Metadata = {
  title: 'Anokha 2026',
  description:
    'Anokha 2026 is the annual tech fair of Amrita Vishwa Vidyapeetham, Coimbatore.',
  metadataBase: new URL(baseUrl),
  keywords: [
    'Anokha',
    'Tech Fair',
    'Amrita',
    'Technology',
    'Innovation',
    'Coimbatore',
    'Events',
    'Dare to be Different',
    'Workshops',
    'Eventide',
  ],
  authors: [{ name: 'Amrita Vishwa Vidyapeetham' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Anokha 2026',
    title: 'Anokha 2026 - Tech Fair of Amrita Vishwa Vidyapeetham',
    description:
      'Anokha 2026 is the annual tech fair of Amrita Vishwa Vidyapeetham, Coimbatore.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anokha 2026 Tech Fair',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anokha 2026 - Tech Fair of Amrita Vishwa Vidyapeetham',
    description:
      'Anokha 2026 is the annual tech fair of Amrita Vishwa Vidyapeetham, Coimbatore.',
    images: ['/images/og-image.png'],
    creator: '@anokha_avvp_cbe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-x-hidden font-sans">
        <Toaster
          position="bottom-center"
          toastOptions={{ style: { maxWidth: '400px' } }}
        />
        <ErrorBoundary>
          <QueryProvider>
            <AuthInit />
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="flex-grow">{children}</main>
            <Footer />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
