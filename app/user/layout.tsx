'use client'

import React, { ReactNode } from 'react'
import Navbar from './components/navbar/navbar'
import MobileNavbar from './components/MobileNavbar/MobileNavbar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <MobileNavbar />
    </div>
  )
}