"use client"

import { useState } from "react"
import { HelpCircle, X } from "lucide-react"

export default function Stats() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const stats = [
    { value: "25+", label: "FEATURES" },
    { value: "3", label: "THEMES" },
    { value: "9", label: "LANGUAGES" },
  ]

  const quickInfo = [
    { label: "Version", value: "TN 1.0.0" },
    {
      label: "License",
      value: (
        <div className="flex items-center justify-center gap-1">
          Proprietary
          <button
            onClick={() => setIsPopupOpen(true)}
            title="Why is this closed source?"
            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      )
    },
    { label: "Platform", value: "Win / Mac" },
  ]

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card terminal-glow">
                <div className="text-2xl md:text-3xl font-bold font-mono text-primary mb-1">{stat.value}</div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Info Box */}
          <div className="terminal-card p-4 terminal-glow">
            <div className="text-xs font-mono text-primary mb-3 flex items-center gap-2">
              <span className="text-secondary">**</span>QUICK INFO
            </div>
            <div className="grid grid-cols-3 gap-4">
              {quickInfo.map((info, idx) => (
                <div key={idx} className="text-center flex flex-col justify-center">
                  <div className="text-xs text-muted-foreground font-mono mb-1">{info.label}</div>
                  <div className="text-sm font-mono text-foreground flex justify-center">{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* License Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="comic-card max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              WHY PROPRIETARY?
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Although I love open source, I built TyperNull primarily as a personal workflow tool.
              </p>
              <p>
                Keeping it closed-source for now allows me to focus completely on its core features and personal use cases, without needing to manage community PRs, rewrite messy codebase structures for public consumption, or act as a full-time maintainer.
              </p>
              <p>
                Maybe one day it will be open-sourced, but for now, it remains a purely personal project that I share free of charge!
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="comic-button px-6 py-2 font-sans tracking-widest text-sm"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
