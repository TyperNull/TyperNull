import Link from "next/link"

export default function About() {
  const supportedApps = ["Cursor", "Windsurf", "VS Code", "VSCode Forks"]

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="section-header mb-2">
            <span className="text-foreground">ABOUT</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// What is TyperNull?</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* What is this */}
          <div className="terminal-card p-6">
            <h3 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-secondary">**</span>WHAT IS THIS?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To be honest, i didn't have plans to release this, all the new features were added because i needed them for my own workflow.
              and slowly i started sharing it with my friends and they liked it, so i decided to release it to the public and give back to the community.
            </p>
          </div>

          {/* Technical Info */}
          <div className="terminal-card p-6">
            <h3 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-secondary">**</span>NOTE!
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm not a professional developer, i just like to code and make things easier for myself. <span className="text-primary font-mono">I'm willing to accept feature requests maybe, but i can't promise anything.
                <br />bug reports are always welcomed! i only do major updates when i feel like it. so dont expect frequent updates.</span>
            </p>
          </div>
        </div>

        {/* some footnotes */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="terminal-card p-5 text-center">
            <div className="text-primary font-bold font-mono mb-2">**ME ON DISCORD</div>
            <p className="text-secondary">
              <a href="https://discord.com/users/972892116835520583">discord@Null</a>
            </p>
          </div>
          <Link href="/feedback?type=feature" className="terminal-card p-5 text-center hover:-translate-y-1 transition-transform cursor-pointer block">
            <div className="text-primary font-bold font-mono mb-2">**REQUEST FEATURES</div>
            <p className="text-sm text-muted-foreground">
              Click here to request features i might add them if i like them but no promises.
            </p>
          </Link>
          <Link href="/feedback?type=bug" className="terminal-card p-5 text-center hover:-translate-y-1 transition-transform cursor-pointer block">
            <div className="text-primary font-bold font-mono mb-2">**BUG REPORT</div>
            <p className="text-sm text-muted-foreground">
              Found an issue? Report bugs here.
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
