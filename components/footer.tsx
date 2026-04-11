import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-retro tracking-widest text-muted-foreground">
            &copy; {currentYear} TYPERNULL. MADE WITH <span className="text-primary">{"<3"}</span>
          </p>
          <p className="text-xs font-retro tracking-widest text-muted-foreground/60 italic">AH SHIT, HERE WE GO AGAIN</p>
        </div>
      </div>
    </footer>
  )
}
