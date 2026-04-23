"use client"

import { useState } from "react"
import { HelpCircle, X, Sparkles } from "lucide-react"

export default function Stats() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const stats = [
    { value: "25+", label: "Features", desc: "Powerful tools" },
    { value: "5", label: "Themes", desc: "Beautiful styles" },
    { value: "9", label: "Languages", desc: "Global support" },
  ]

  const quickInfo = [
    { label: "Version", value: "1.0.0" },
    {
      label: "License",
      value: (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="inline-flex items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors mx-auto"
        >
          Proprietary
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      )
    },
    { label: "Platform", value: "Win / Mac" },
  ]

  return (
    <>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">At a glance</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6 text-center group">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>

          {/* Quick Info Box */}
          <div className="glass-card p-4">
            <div className="grid grid-cols-3 gap-4">
              {quickInfo.map((info, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{info.label}</div>
                  <div className="text-sm font-medium text-foreground">{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* License Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">
              Why Proprietary?
            </h3>

            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
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

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-xl hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
