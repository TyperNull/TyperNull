import Features from "@/components/features"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Features - TyperNull',
    description: 'Explore the powerful features of TyperNull.',
}

export default function FeaturesPage() {
    return (
        <div className="py-20">
            <Features />
        </div>
    )
}
