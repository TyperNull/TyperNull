export default function HowToUse() {
  const steps = [
    { step: "1", title: "Open Adobe Photoshop", desc: "Launch your Photoshop application" },
    { step: "2", title: "Navigate to Extensions", desc: "Window → Extensions → TyperNull" },
    { step: "3", title: "Start Using", desc: "TyperNull is ready to enhance your workflow" },
  ]

  return (
    <section id="how-to-use" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">HOW TO USE</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// Easy 3 steps to start</p>
        </div>

        {/* Quick Start Steps */}
        <div className="terminal-card p-6 mb-8">
          <h3 className="font-retro tracking-wide text-xl text-foreground mb-6 flex items-center gap-2">
            <span className="text-primary">$</span> ./quickstart
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center font-retro tracking-wide text-xl text-primary flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-mono font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="terminal-card p-5">
            <h4 className="font-retro tracking-wide text-xl text-primary mb-3">Assign Shortcuts</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Edit any style → Find Keyboard Shortcut section → Click field → Press desired keys → Save. Supports
              Ctrl+Number, brackets, and symbol combinations.
            </p>
          </div>
          <div className="terminal-card p-5">
            <h4 className="font-retro tracking-wide text-xl text-primary mb-3">Manage Folders</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open folders apply styles automatically. Closed folders show colored borders indicating inactive state.
              Copy shortcuts between folders with automatic matching.
            </p>
          </div>
          <div className="terminal-card p-5">
            <h4 className="font-retro tracking-wide text-xl text-primary mb-3">Switch Themes</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Access theme settings in the main interface. Choose from Default, Purple Ocean, Midnight, Neon Pink, and
              Pinky Pink themes.
            </p>
          </div>
          <div className="terminal-card p-5">
            <h4 className="font-retro tracking-wide text-xl text-primary mb-3">AutoHotkey Tip</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use key hold timing (50ms) in AHK scripts for reliable detection with Adobe CEP polling cycle.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
