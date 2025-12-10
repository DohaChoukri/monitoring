import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

/**
 * Layout Component with Sidebar
 * Provides the main layout structure with a toggleable sidebar
 * @param {Object} props
 * @param {React.ReactNode} props.children - The main content to render
 */
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />

        <main className="flex-1 p-4">
          <SidebarTrigger className="mb-4" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
