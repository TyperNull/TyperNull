import { Keyboard, Layers, Palette, Terminal, BookOpen } from "lucide-react"

export default function HowToUse() {
  const steps = [
    { step: "1", title: "Open Adobe Photoshop", desc: "Launch your Photoshop application" },
    { step: "2", title: "Navigate to Extensions", desc: "Window → Extensions → TyperNull" },
    { step: "3", title: "Start Using", desc: "TyperNull is ready to enhance your workflow" },
  ]

  const tips = [
    {
      icon: Keyboard,
      title: "Assign Shortcuts",
      desc: "Edit any style → Find Keyboard Shortcut section → Click field → Press desired keys → Save. Supports Ctrl+Number, brackets, and symbol combinations.",
      color: "primary"
    },
    {
      icon: Layers,
      title: "Manage Folders",
      desc: "Open folders apply styles automatically. Closed folders show colored borders indicating inactive state. Copy shortcuts between folders with automatic matching.",
      color: "accent"
    },
    {
      icon: Palette,
      title: "Switch Themes",
      desc: "Access theme settings in the main interface. Choose from Default, Purple Ocean, Midnight, Neon Pink, and Pinky Pink themes.",
      color: "primary"
    },
    {
      icon: Terminal,
      title: "AutoHotkey Tip",
      desc: "Use key hold timing (50ms) in AHK scripts for reliable detection with Adobe CEP polling cycle.",
      color: "accent"
    },
  ]

  return (
    <section id="how-to-use" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Guide</span>
          </div>
          <h2 className="section-title mb-4">How to Use</h2>
          <p className="section-subtitle">Get started in 3 easy steps</p>
        </div>

        {/* Quick Start Steps */}
        <div className="glass-card p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">Quick Start</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Tips */}
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-${tip.color}/10 flex items-center justify-center`}>
                  <tip.icon className={`w-4 h-4 text-${tip.color}`} />
                </div>
                <h4 className="font-semibold text-foreground">{tip.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
