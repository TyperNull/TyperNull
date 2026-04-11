import { Keyboard, FolderOpen, Palette, Trash2, Layout, Zap } from "lucide-react"

const features = [
  {
    title: "Style Shortcuts",
    description: "Assign keyboard shortcuts to any style. Instant application with conflict detection.",
    icon: Keyboard,
    bullets: ["Custom shortcuts per style", "Instant application", "Conflict resolution"],
  },
  {
    title: "Folder System",
    description: "Organize with folder-based shortcut management. Toggle and copy between folders.",
    icon: FolderOpen,
    bullets: ["Toggle shortcuts per folder", "Copy between folders", "Visual folder states"],
  },
  {
    title: "Performance",
    description: "40ms polling for responsive detection. Adobe CEP optimized.",
    icon: Zap,
    bullets: ["Lightning fast startup", "Optimized processing", "Smart caching"],
  },
  {
    title: "Theme System",
    description: "Multiple built-in themes with smooth transitions and consistent UI.",
    icon: Palette,
    bullets: ["Purple Ocean default", "Midnight theme", "Neon & Pinky Pink"],
  },
  {
    title: "Folder Deletion",
    description: "Complete folder deletion with safe options and visual warnings.",
    icon: Trash2,
    bullets: ["Move to unsorted", "Permanent delete", "Visual warnings"],
  },
  {
    title: "Enhanced UI",
    description: "Beautiful modal layouts, improved focus states, and visual indicators.",
    icon: Layout,
    bullets: ["Modal layouts", "Clean focus states", "Shortcut badges"],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">FEATURES</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// What can TyperNull do?</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card group">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10 border border-primary/30 text-primary group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-retro tracking-wide text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                        <span className="text-primary">*</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
