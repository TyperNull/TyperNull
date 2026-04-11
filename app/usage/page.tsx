import Usage from "@/components/usage"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Usage - TyperNull',
    description: 'How to use TyperNull effectively.',
}

export default function UsagePage() {
    return (
        <div className="py-20">
            <Usage />
        </div>
    )
}
