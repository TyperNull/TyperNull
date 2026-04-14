import HowToUse from "@/components/how-to-use"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'How to Use - TyperNull',
    description: 'Learn how to use TyperNull effectively.',
}

export default function HowToUsePage() {
    return (
        <div className="py-20">
            <HowToUse />
        </div>
    )
}
