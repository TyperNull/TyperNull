import Link from "next/link"
import { Github, Bug } from "lucide-react"

export default function Credits() {
  const credits = [
    { name: "Swirt", role: "Original TypeRTools Creator", note: "Inspiration & Foundation" },
  ]

  return (
    <section id="credits" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">CREDITS</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// Special thanks</p>
        </div>

        {/* Credits Table */}
        <div className="terminal-card p-6 mb-8">
          <div className="space-y-4">
            {credits.map((credit, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-border/30 last:border-0"
              >
                <div>
                  <span className="font-retro tracking-wide text-xl text-foreground">{credit.name}</span>
                  <span className="text-muted-foreground mx-2">—</span>
                  <span className="text-sm text-muted-foreground">{credit.role}</span>
                </div>
                <span className="text-sm text-primary font-mono mt-1 md:mt-0">{credit.note}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
