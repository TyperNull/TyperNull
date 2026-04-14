"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import DownloadButton from "@/components/download-button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Features", "About", "Gallery", "Install", "How to Use"]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50" : "bg-transparent"
        }`}
    >
      {/* Sticky nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-transparent border-2 border-primary/50 text-shadow-none shadow-[2px_2px_0_rgba(34,197,94,0.5)] flex items-center justify-center font-retro text-2xl text-primary group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[0px_0px_0_rgba(34,197,94,0.5)] transition-all">
              T
            </div>
            <span className="text-xl font-retro tracking-widest text-primary stroke-primary stroke-2 drop-shadow-[2px_2px_0px_rgba(34,197,94,0.4)] group-hover:text-foreground transition-colors">
              TYPERNULL
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  [{item}]
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/30 pt-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-xl font-sans text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-4 pt-4 border-t border-border/30">
              
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
