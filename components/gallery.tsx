"use client"

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
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">SHOWCASE</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// See TyperNull in action</p>
        </div>

        {/* Featured Showcase */}
        <div className="mb-12">
          <div className="terminal-card overflow-hidden group border-primary/30">
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
                <h3 className="font-pixel text-xl text-primary drop-shadow-md">{featured.label}</h3>
                <p className="text-muted-foreground font-mono text-sm mt-1">Full video demonstration of the VX interface</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {others.map((screenshot, idx) => (
            <div key={idx} className="terminal-card overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="aspect-video bg-muted/20 relative overflow-hidden">
                <img
                  src={screenshot.src || "/placeholder.svg"}
                  alt={screenshot.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3 border-t border-border/30">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{screenshot.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
