"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Download, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { basePath } from "@/lib/utils"

import { flushSync } from "react-dom"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggleThemeAnimated = (e: React.MouseEvent) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    const target = e.currentTarget as HTMLElement | null
    const rect = target?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    document.documentElement.style.setProperty("--vt-x", `${x}px`)
    document.documentElement.style.setProperty("--vt-y", `${y}px`)

    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    })
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 10)

      if (isMobileMenuOpen) {
        setIsHidden(false)
      } else if (currentY < 40) {
        setIsHidden(false)
      } else {
        setIsHidden(true)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobileMenuOpen])

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Install", href: "/install" },
    { name: "Guide", href: "/how-to-use" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3"
          : "py-5"
      } ${isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "glass shadow-lg"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden">
              <Image
                src={basePath("/favicon/fav.png")}
                alt="TyperNull"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="text-lg font-normal tracking-tight text-foreground uppercase" style={{ fontFamily: 'var(--font-retro), sans-serif' }}>
              TyperNull
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-all cursor-pointer"
              aria-label="Toggle dark mode"
              onClick={toggleThemeAnimated}
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <Link
              href="/install"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-background/95 border border-border/50 shadow-lg rounded-2xl p-4 animate-in slide-in-from-top-2 fade-in duration-150">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-border">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 mb-3 text-sm font-medium text-foreground bg-secondary/80 hover:bg-secondary rounded-xl transition-colors cursor-pointer"
                aria-label="Toggle dark mode"
                onClick={toggleThemeAnimated}
              >
                {mounted && resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                {mounted && resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <Link
                href="/install"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                Download
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
