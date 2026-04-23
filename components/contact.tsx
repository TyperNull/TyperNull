'use client'

import { Mail, Heart, Coffee } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</span>
          </div>
          <h2 className="section-title mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have questions? Found a bug? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-3">Credits</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
            TyperNull is built on the foundation of TypeRTools. Special thanks to Swirt for the original TypeRTools.
          </p>
          <div className="mt-6 flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent" fill="currentColor" />
            <span>&</span>
            <Coffee className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
