'use client'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-foreground/60">
            Have questions? Found a bug? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="glass mt-8 p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-3">Credits</h3>
          <p className="text-foreground/70 text-sm leading-relaxed">
            TyperNull is built on the foundation of TypeRTools. Special thanks to Swirt for the original TypeRTools.
          </p>
          <div className="mt-4 flex justify-center items-center gap-2 text-sm">
            <span className="text-primary">Made with</span>
            <span className="text-lg">💜 & ☕</span>
          </div>
        </div>
      </div>
    </section>
  )
}
