'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        

        {/* Main content with padding for fixed header */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}