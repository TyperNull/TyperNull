import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function basePath(path: string): string {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/TyperNull" : "")
  // Ensure we don't double slash if the path starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${prefix}${cleanPath}`
}
