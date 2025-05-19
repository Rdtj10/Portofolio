"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/utils/cn"
import { useTheme } from "@/context/themeContext"

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === "dark"

  return (
    <SwitchPrimitive.Root
      checked={isDark}
      onCheckedChange={toggleTheme}
      className={cn(
        "peer inline-flex h-10 w-20 items-center rounded-full border border-transparent dark:bg-white p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-zinc-700",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full dark:bg-zinc-700 bg-white text-yellow-500 shadow-md transition-transform duration-300",
          "data-[state=checked]:translate-x-[40px] data-[state=unchecked]:translate-x-0"
        )}
      >
        {isDark ? <Moon className="h-4 w-4 text-yellow-300" /> : <Sun className="h-4 w-4 text-yellow-600" />}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}
