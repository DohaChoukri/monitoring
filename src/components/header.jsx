import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

const Header = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = now.toLocaleString()

  return (
    <header className="p-4 bg-gray-100 text-black flex justify-between items-start gap-4">
      {/* Left: Sidebar trigger + Date/Time + Refresh */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="text-sm font-medium" aria-live="polite">{formatted}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setNow(new Date())}
          aria-label="Refresh date and time"
          className="h-8 w-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 2l3 3-3 3M6 22l-3-3 3-3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 5H10a7 7 0 0 0-7 7m0 7h11a7 7 0 0 0 7-7"
            />
          </svg>
        </Button>
      </div>

      {/* Center: Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <svg
          className="w-4 h-4 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          aria-label="Search"
          placeholder="Search..."
          className="px-3 py-2 rounded bg-white text-black flex-1 text-sm"
        />
      </div>

      {/* Right: Profile */}
      <div className="flex items-center">
        <button
          type="button"
          className="flex items-center gap-2 hover:bg-gray-400/30 rounded px-3 py-1 transition-colors"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs">
            DC
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-medium">Doha Choukri</span>
            <span className="text-xs opacity-70">Admin</span>
          </div>
          <svg
            className="w-4 h-4 opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header;
