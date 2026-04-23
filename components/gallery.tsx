"use client"

import { Image as ImageIcon, Play } from "lucide-react"

const PATH_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || ""

const screenshots = [
  {
    src: `${PATH_PREFIX}/sc/vid/uishowcase.mp4`,
    alt: "UI Showcase",
    label: "Main Interface",
  },
  {
    src: `${PATH_PREFIX}/sc/visual/UIshowcase3.PNG`,
    alt: "Style Editing",
    label: "Style Editor",
  },
  {
    src: `${PATH_PREFIX}/sc/visual/UIshowcase5.PNG`,
    alt: "Settings Interface",
    label: "Settings",
  },
  {
    src: `${PATH_PREFIX}/sc/visual/Newinstaller.PNG`,
    alt: "New Installer",
    label: "Multi-Language Installer",
  },
]

export default function Gallery() {
  const featured = screenshots[0]
  const others = screenshots.slice(1)

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <ImageIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Gallery</span>
          </div>
          <h2 className="section-title mb-4">See it in action</h2>
          <p className="section-subtitle">Experience the modern interface</p>
        </div>

        {/* Featured Showcase */}
        <div className="mb-6">
          <div className="glass-card overflow-hidden group">
            <div className="aspect-video bg-muted/30 relative overflow-hidden">
              {featured.src.endsWith(".mp4") ? (
                <video
                  src={featured.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={featured.src || "/placeholder.svg"}
                  alt={featured.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay Label for Featured */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg text-foreground">{featured.label}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">Full video demonstration of the interface</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {others.map((screenshot, idx) => (
            <div key={idx} className="glass-card overflow-hidden group">
              <div className="aspect-video bg-muted/20 relative overflow-hidden">
                <img
                  src={screenshot.src || "/placeholder.svg"}
                  alt={screenshot.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 border-t border-border/50">
                <p className="text-sm font-medium text-foreground">{screenshot.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
