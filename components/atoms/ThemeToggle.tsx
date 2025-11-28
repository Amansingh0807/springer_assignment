"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/atoms/Button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button 
                variant="ghost" 
                className="w-10 h-10 p-0 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
            >
                <Sun className="h-5 w-5 text-zinc-400" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            className="w-10 h-10 p-0 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark" ? (
                <Moon className="h-5 w-5 text-yellow-500" />
            ) : (
                <Sun className="h-5 w-5 text-orange-500" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
