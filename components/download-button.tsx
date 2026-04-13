"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { downloadLatestRelease } from "@/lib/download"

interface DownloadButtonProps {
  className?: string
  iconClassName?: string
  label?: string
  /** Show only the icon (no label text) */
  iconOnly?: boolean
}

export default function DownloadButton({
  className = "",
  iconClassName = "w-4 h-4",
  label = "Download",
  iconOnly = false,
}: DownloadButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle")

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (state === "loading") return
    setState("loading")

    const result = await downloadLatestRelease()

    if (result.success) {
      setState("idle")
    } else {
      setState("error")
      // Reset back to idle after showing the error briefly
      setTimeout(() => setState("idle"), 3000)
    }
  }

  return (
    <button onClick={handleClick} className={`cursor-pointer ${className}`} disabled={state === "loading"}>
      {state === "loading" ? (
        <Loader2 className={`${iconClassName} animate-spin`} />
      ) : (
        <Download className={iconClassName} />
      )}
      {!iconOnly && (
        <span>
          {state === "loading" ? "Fetching..." : state === "error" ? "Error – Retry" : label}
        </span>
      )}
    </button>
  )
}
