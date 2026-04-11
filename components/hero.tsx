"use client"

import Link from "next/link"
import { Download, ArrowRight, Github } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Retro Font Title */}
        <div className="mb-12 py-8">
          <h1 className="section-header text-6xl sm:text-8xl md:text-9xl mb-4 animate-[pulse_3s_ease-in-out_infinite]">
            TYPERNULL
          </h1>
        </div>

        {/* Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          A more advanced version of <span className="text-secondary">Typertools</span>
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          A complete rewrite of <span className="text-secondary">typertools</span> with a new UI, new features, and lots of bug fixes.
        </p>
        <div className="mb-12">
          <span className="comic-speech-bubble text-primary text-sm relative"><span className="pulse">●</span> Version 1.0.0 now available</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-button px-8 py-4 flex items-center justify-center gap-2 text-lg hover:scale-105"
          >
            <Download className="w-5 h-5" />
            DOWNLOAD
          </Link>
          <Link
            href="/features"
            className="comic-button bg-card text-foreground px-8 py-4 flex items-center justify-center gap-2 text-lg hover:bg-primary/20 hover:scale-105"
          >
            NEW FEATURES
            <ArrowRight className="w-5 h-5" />
          </Link>

        </div>
      </div>
    </section>
  )
}