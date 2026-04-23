"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Github, MessageSquare, Globe } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 rotate-12 animate-pulse" />
        <div className="absolute bottom-1/3 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-pink-500/20 -rotate-12 animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 rotate-45 animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Title with retro font */}
        <div className="relative inline-block mb-6">
          {/* Speech bubble badge */}
          <div className="absolute -top-8 right-0 md:-top-10 md:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-medium shadow-lg shadow-primary/25 whitespace-nowrap">
            <Sparkles className="w-3 h-3" />
            v1.0.0 out now
            {/* speech bubble tail */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 rounded-sm" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase" style={{ fontFamily: 'var(--font-retro), sans-serif' }}>
            TyperNull
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          A more advanced version of <span className="text-foreground font-medium">Typertools</span>
        </p>
        
        <p className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10">
          Complete rewrite with a modern UI, powerful new features, and extensive bug fixes for professional typesetting workflows.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/install"
            className="glow-button text-white flex items-center gap-2"
          >
            Download Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/features"
            className="px-6 py-3 font-medium text-foreground glass-card hover:bg-secondary/80 flex items-center gap-2"
          >
            Explore Features
          </Link>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/feedback"
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Report Bug
          </Link>
          <Link
            href="/translate"
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
          >
            <Globe className="w-4 h-4" />
            Help Translate
          </Link>
        </div>
      </div>
    </section>
  )
}