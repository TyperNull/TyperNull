import Installation from "@/components/installation"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Installation - TyperNull',
    description: 'Step-by-step guide to install TyperNull.',
}

export default function InstallPage() {
    return (
        <div className="py-20">
            <Installation />
        </div>
    )
}
