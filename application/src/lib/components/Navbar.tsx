import React from 'react'


function Navbar() {
  return (
    <header className="w-full border-b border-border/40 backdrop-blur-sm bg-background/80 border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 sm:px-8">
          <div className="flex items-center gap-1">
            <img
              className="text-white h-8"
              src="/task-logo.svg"
              alt="App Logo"
            />
            <span className="font-mono text-xs tracking-tight text-muted-foreground hidden sm:block opacity-60">
              Task Manager Ai Agent
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="/features" className="text-sm hover:text-foreground transition-colors text-muted-foreground">
              Features
            </a>
            <a href="/pricing" className="text-sm hover:text-foreground transition-colors text-muted-foreground">
              Pricing
            </a>
            <a href="/docs" className="text-sm hover:text-foreground transition-colors text-muted-foreground">
              Docs
            </a>
            <a
              href="/dashboard"
              className="rounded-full bg-foreground text-background hover:opacity-90 font-medium text-sm px-4 py-2 transition-all"
            >
              Sign In
            </a>
          </nav>
        </div>
      </header>
  )
}

export default Navbar