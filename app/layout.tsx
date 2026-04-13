import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Press_Start_2P } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const retroFont = localFont({
  src: '../public/fonts/retro.otf',
  variable: '--font-retro'
});

export const metadata: Metadata = {
  title: 'TyperNull',
  description: 'A more advanced version of typertools with a new UI, new features, and lots of bug fixes.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

import Header from "@/components/header"
import Footer from "@/components/footer"

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background ${retroFont.variable} overflow-x-hidden`} suppressHydrationWarning>
        {/* Halftone dot pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none opacity-70" />
        {/* Global Paper Texture Overlay */}
        <div className="fixed inset-0 z-[100] pointer-events-none bg-paper mix-blend-overlay" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
