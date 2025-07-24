import React from 'react'
import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                className="text-white mb-4 h-10"
                src="/task-logo.svg"
                alt="App Logo"
              />
              <p className="text-sm text-muted-foreground">
                The AI-powered task manager that helps you stay organized and productive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="/integrations" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/docs" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="/blog" className="hover:text-foreground transition-colors">Github</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AI Task Manager.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer