import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { name: "Features", href: "/features" },
    { name: "Install", href: "/install" },
    { name: "Feedback", href: "/feedback" },
    { name: "Translate", href: "/translate" },
  ]

  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                T
              </div>
              <span className="text-lg font-semibold text-foreground">TyperNull</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} TyperNull. Made with <Heart className="w-3 h-3 inline text-accent" fill="currentColor" />
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
