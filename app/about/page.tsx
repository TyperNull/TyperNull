import About from "@/components/about"
import Credits from "@/components/credits"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About - TyperNull',
    description: 'Learn about the TyperNull project and its contributors.',
}

export default function AboutPage() {
    return (
        <div className="py-20 space-y-20">
            <About />
            <Credits />
        </div>
    )
}
