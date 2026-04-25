import Link from "next/link"
import { Heart } from "lucide-react"
import { basePath } from "@/lib/utils"

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
              <img src={basePath("/favicon/fav.png")} width={36} height={36} className="rounded-xl" alt="" />
              <span className="text-lg font-normal tracking-tight text-foreground uppercase" style={{ fontFamily: 'var(--font-retro), sans-serif' }}>
                TyperNull
              </span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Ah shit here we go again.
          </p>
        </div>
      </div>
    </footer>
  )
}
