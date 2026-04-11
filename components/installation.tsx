import { Star, Terminal, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

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
              <h3 className="font-retro tracking-wide text-xl text-primary">RECOMMENDED</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Download the latest release and run the installer.</p>

            <div className="space-y-3 mb-6">
              <div className="code-block">
                <span className="text-muted-foreground"># 1. Download from Releases</span>
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

            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-button text-sm px-5 py-2 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Now
            </Link>
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
