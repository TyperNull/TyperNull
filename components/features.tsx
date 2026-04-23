import { Keyboard, FolderOpen, Palette, Trash2, Layout, Zap, Sparkles, Terminal, Layers } from "lucide-react"

const features = [
  {
    title: "Style Shortcuts",
    description: "Assign keyboard shortcuts to any style with instant application and smart conflict detection.",
    icon: Keyboard,
    size: "normal",
  },
  {
    title: "Folder System",
    description: "Organize with folder-based shortcut management. Toggle and copy between folders seamlessly.",
    icon: FolderOpen,
    size: "normal",
  },
  {
    title: "Lightning Performance",
    description: "40ms polling for responsive detection. Adobe CEP optimized with smart caching.",
    icon: Zap,
    size: "large",
  },
  {
    title: "Theme System",
    description: "Multiple built-in themes with smooth transitions. Purple Ocean, Midnight, Neon, and more.",
    icon: Palette,
    size: "normal",
  },
  {
    title: "Smart Deletion",
    description: "Safe folder deletion with visual warnings and move-to-unsorted options.",
    icon: Trash2,
    size: "normal",
  },
  {
    title: "Modern UI",
    description: "Beautiful modal layouts with improved focus states and visual indicators throughout.",
    icon: Layout,
    size: "normal",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Features</span>
          </div>
          <h2 className="section-title mb-4">Everything you need</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Powerful features designed to streamline your typesetting workflow and boost productivity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`glass-card group p-6 ${feature.size === "large" ? "md:col-span-2 lg:col-span-1 md:row-span-2" : ""}`}
            >
              <div className={`flex ${feature.size === "large" ? "flex-col h-full" : "items-start gap-4"}`}>
                <div className="feature-icon mb-4 shrink-0">
                  <feature.icon />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${feature.size === "large" ? "text-base" : "text-sm"}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pro Tips</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Get the most out of TyperNull</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Keyboard className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Assign Shortcuts</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Edit any style → Find Keyboard Shortcut section → Click field → Press desired keys → Save. 
                Supports Ctrl+Number, brackets, and symbol combinations.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground">Manage Folders</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Open folders apply styles automatically. Closed folders show colored borders indicating inactive state. 
                Copy shortcuts between folders with automatic matching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
