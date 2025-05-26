import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'To Do List',
  description: 'to do list courses and tasks',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
