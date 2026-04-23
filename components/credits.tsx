import { Heart, ExternalLink } from "lucide-react"

export default function Credits() {
  const credits = [
    { name: "Swirt", role: "Original TypeRTools Creator", note: "Inspiration & Foundation" },
  ]

  return (
    <section id="credits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Credits</span>
          </div>
          <h2 className="section-title mb-4">Special Thanks</h2>
          <p className="section-subtitle">To those who made this possible</p>
        </div>

        {/* Credits Cards */}
        <div className="space-y-4">
          {credits.map((credit, idx) => (
            <div
              key={idx}
              className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl font-bold text-primary">
                  {credit.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{credit.name}</h3>
                  <p className="text-sm text-muted-foreground">{credit.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10">
                <span className="text-sm font-medium text-primary">{credit.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
