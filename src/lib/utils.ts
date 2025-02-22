import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TimelineEntry } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

export function generateTimelineId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
  return validTypes.includes(file.type)
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function validateImages(files: FileList): string | null {
  const invalidFiles = Array.from(files).filter(file => !isValidImageFile(file))
  if (invalidFiles.length > 0) {
    return 'Please upload only image files (JPEG, PNG, WEBP, HEIC)'
  }

  const largeFiles = Array.from(files).filter(file => file.size > MAX_FILE_SIZE)
  if (largeFiles.length > 0) {
    return 'Some files exceed the maximum size of 5MB'
  }

  return null
}
