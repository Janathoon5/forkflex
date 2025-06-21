"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Dumbbell, Target, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserMenu } from "./user-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Workouts", href: "/workouts", icon: Dumbbell },
    { name: "Nutrition", href: "/nutrition", icon: Target },
    { name: "Goals", href: "/goals", icon: Settings },
  ]

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <span className="text-2xl font-bold text-blue-400 relative -top-1">F</span>
        <span className="text-2xl font-bold text-blue-400">F</span>
      </div>
      <div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Fork
        </span>
        <span className="text-xl font-bold text-blue-400 ml-1">&</span>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-1">
          Flex
        </span>
      </div>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/60 shadow-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 transition-all duration-200 hover:text-blue-400 hover:scale-105 px-3 py-2 rounded-lg",
                  pathname === item.href
                    ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-sm"
                    : "text-slate-300 hover:bg-slate-800",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Menu */}
        <div className="hidden md:flex items-center">
          <UserMenu />
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden ml-auto hover:bg-slate-800 text-slate-300" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] bg-slate-900/95 backdrop-blur-md border-slate-700"
          >
            <div className="flex flex-col space-y-4 mt-4">
              <Logo />
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:scale-105",
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="pt-4 border-t border-slate-700">
                <UserMenu />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
