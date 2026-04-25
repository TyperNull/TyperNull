import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap'
});

const retroFont = localFont({
  src: '../public/fonts/retro.otf',
  variable: '--font-retro',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'TyperNull — Advanced Typertools',
  description: 'A more advanced version of typertools with a new UI, new features, and lots of bug fixes.',
  icons: {
    icon: [
      {
        url: basePath('/favicon/fav.png'),
      },
      {
        url: basePath('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: basePath('/icon-dark-32x32.png'),
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

import Header from "@/components/header"
import Footer from "@/components/footer"
import { basePath } from '@/lib/utils'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${retroFont.variable} font-sans antialiased bg-background overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {/* Animated Grid Background */}
          <div className="fixed inset-0 grid-background pointer-events-none opacity-50" />

          {/* Floating Gradient Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="gradient-orb orb-1 top-20 -left-20" />
            <div className="gradient-orb orb-2 top-40 right-10" />
            <div className="gradient-orb orb-3 bottom-20 left-1/3" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24 md:pt-28">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
