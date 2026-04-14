import { Star } from "lucide-react"
import DownloadButton from "@/components/download-button"

const usageSteps = [
  { step: "1", title: "Open Adobe Photoshop", desc: "Launch your Photoshop application" },
  { step: "2", title: "Navigate to Extensions", desc: "Window → Extensions → TyperNull" },
  { step: "3", title: "Start Using", desc: "TyperNull is ready to enhance your workflow" },
]

export default function Installation() {
  return (
    <section id="install" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">INSTALLATION</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// Get started in minutes</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Recommended Method */}
          <div className="terminal-card p-6 border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="font-retro tracking-wide text-xl text-primary"></h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="code-block">
                <span className="text-muted-foreground"># 1. Click Download</span>
              </div>
              <div className="code-block">
                <span className="text-muted-foreground"># 2. Extract the archive (YES EXTRACT IT!)</span>
              </div>
              <div className="code-block">
                <span className="text-primary">$</span> install_win.cmd
                <span className="text-muted-foreground ml-4"># Windows</span>
              </div>
              <div className="code-block">
                <span className="text-primary">$</span> chmod +x install_mac.sh && ./install_mac.sh
                <span className="text-muted-foreground ml-4"># macOS</span>
              </div>
            </div>

            <DownloadButton
              className="comic-button text-sm px-5 py-2 inline-flex items-center gap-2"
              iconClassName="w-4 h-4"
              label="Download Now"
            />
          </div>
        </div>

        {/* How to Activate */}
        <div className="mt-16 mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">HOW TO ACTIVATE EXTENSION</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// Easy 3 steps to start</p>
        </div>

        <div className="terminal-card p-6">
          <h3 className="font-retro tracking-wide text-xl text-foreground mb-6 flex items-center gap-2">
            <span className="text-primary">$</span> ./quickstart
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {usageSteps.map((item) => (
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

        {/* Requirements Note */}
        <div className="terminal-card mt-8 p-4 border-l-2 border-primary/50">
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-primary">Note:</span> Some portable or lightweight Photoshop builds may have
            compatibility issues. Requires Node.js for building from source.
          </p>
        </div>
      </div>
    </section>
  )
}
