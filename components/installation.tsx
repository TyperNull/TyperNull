import { Download, Terminal, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import DownloadButton from "@/components/download-button"

const usageSteps = [
  { step: "1", title: "Open Adobe Photoshop", desc: "Launch your Photoshop application" },
  { step: "2", title: "Navigate to Extensions", desc: "Window → Extensions → TyperNull" },
  { step: "3", title: "Start Using", desc: "TyperNull is ready to enhance your workflow" },
]

const installSteps = [
  { cmd: "Download the latest release", desc: "Get the files from the download page" },
  { cmd: "Extract the archive", desc: "Important: Extract before running!" },
  { cmd: "install_win.cmd", desc: "Windows installer" },
  { cmd: "chmod +x install_mac.sh && ./install_mac.sh", desc: "macOS installer" },
]

export default function Installation() {
  return (
    <section id="install" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Download className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Installation</span>
          </div>
          <h2 className="section-title mb-4">Get started in minutes</h2>
          <p className="section-subtitle">Simple setup for both Windows and macOS</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Installation Steps */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Quick Install</h3>
            </div>

            <div className="space-y-4 mb-6">
              {installSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-mono font-medium text-primary">{idx + 1}</span>
                  </div>
                  <div>
                    <code className="text-sm font-mono text-foreground">{step.cmd}</code>
                    <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <DownloadButton
              className="glow-button text-white flex items-center justify-center gap-2 w-full"
              label="Download Now"
            />
          </div>

          {/* Activation Steps */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Activation</h3>
            </div>

            <div className="space-y-6">
              {usageSteps.map((item) => (
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
        </div>

        {/* Requirements Note */}
        <div className="glass-card p-6 border-l-4 border-l-primary">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Compatibility Note</h4>
              <p className="text-sm text-muted-foreground">
                Some portable or lightweight Photoshop builds may have compatibility issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
