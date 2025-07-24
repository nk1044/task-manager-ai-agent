import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import {
  Brain,
  CalendarCheck,
  ClipboardList,
  Timer,
} from "lucide-react";
import { useRouter } from "next/navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const features = [
  {
    title: "Smart Scheduling",
    description: "AI automatically prioritizes and schedules your tasks based on deadlines and importance"
  },
  {
    title: "Natural Language",
    description: "Just tell your AI what needs to be done in plain English - no complex forms"
  },
  {
    title: "Real-time Updates",
    description: "Your schedule adapts automatically as priorities change throughout the day"
  },
  {
    title: "Beautiful Interface",
    description: "Clean, minimal design that stays out of your way while you work"
  }
]

export default function Home() {  

  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };


  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-background text-foreground`}
    >
      {/* HEADER */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-muted/30 px-4 py-2 text-sm text-muted-foreground mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI-Powered Productivity
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Your AI-Powered
              <br />
              <span className="text-foreground">Task Manager</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Organize smarter with an AI agent that understands your workflow.
              Plan, prioritize, and finish your work without the stress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
              <button
                className="group rounded-full cursor-pointer border border-transparent bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-semibold text-lg h-14 px-8 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                onClick={() => handleNavigation('/tasks')}>
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="rounded-full cursor-pointer border border-neutral-800 hover:bg-muted/50 hover:border-border/60 font-medium text-lg h-14 px-8 transition-all duration-200 flex items-center gap-2"
                onClick={() => handleNavigation('/docs')}>
                Docs
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                No setup required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                Works instantly
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                Open source friendly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 border-t border-neutral-600">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for modern productivity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to help you focus on what matters most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-neutral-800 hover:border-border/60 hover:bg-muted/20 transition-all duration-200"
              >
                <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-8">Designed to help you think, plan, and work with clarity</p>
          <div className="flex items-center justify-center gap-12 opacity-40">
            <Brain className="h-8 w-8 hover:scale-115 transition-transform" />
            <ClipboardList className="h-8 w-8 hover:scale-115 transition-transform" />
            <CalendarCheck className="h-8 w-8 hover:scale-115 transition-transform" />
            <Timer className="h-8 w-8 hover:scale-115 transition-transform" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to get organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Try this free AI-powered task manager.
          </p>
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-semibold text-lg h-14 px-8 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => handleNavigation('/tasks')}>
            Try it now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}