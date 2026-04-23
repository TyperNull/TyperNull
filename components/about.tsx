import { Info, AlertCircle, MessageCircle } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">About</span>
          </div>
          <h2 className="section-title mb-4">What is TyperNull?</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* What is this */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Origin Story</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To be honest, I didn't have plans to release this. All the new features were added because I needed them for my own workflow.
              Slowly I started sharing it with my friends and they liked it, so I decided to release it to the public and give back to the community.
            </p>
          </div>

          {/* Technical Info */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">A Note from the Developer</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              I'm not a professional developer, I just like to code and make things easier for myself. I'm willing to accept feature requests maybe, but I can't promise anything.
              Bug reports are always welcomed! I only do major updates when I feel like it, so don't expect frequent updates.
            </p>
          </div>
        </div>

        {/* Discord Contact */}
        <div className="mt-8 glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Get in Touch</h4>
              <p className="text-sm text-muted-foreground">Questions or feedback? Reach out on Discord</p>
            </div>
          </div>
          <a
            href="https://discord.com/users/972892116835520583"
            className="px-6 py-2.5 text-sm font-medium text-foreground glass-card hover:bg-secondary/80 transition-colors"
          >
            discord@Null
          </a>
        </div>
      </div>
    </section>
  )
}
