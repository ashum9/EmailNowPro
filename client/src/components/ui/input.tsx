import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            // Base styles
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            // Animated underline effect
            "transition-colors duration-300",
            "focus:border-primary focus:shadow-[0_2px_0_0_var(--tw-shadow-color)] focus:shadow-primary",
            "hover:border-primary",
            // Custom animation: subtle scale and glow on focus
            "focus:scale-[1.03] focus:shadow-lg focus:shadow-primary/20",
            // Custom animation: shake on invalid
            "invalid:animate-shake",
            // New: pulse border on hover
            "hover:animate-pulse-border",
            // New: fade-in on mount
            "animate-fade-in",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Animated underline */}
        <span
          className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full"
        />
        {/* Custom animated icon on focus */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce text-primary"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
// Tailwind custom animations for shake, pulse-border, and fade-in
// Add this to your tailwind.config.js if not present:
// theme: { extend: { keyframes: {
//   shake: { '0%, 100%': { transform: 'translateX(0)' }, '20%, 60%': { transform: 'translateX(-4px)' }, '40%, 80%': { transform: 'translateX(4px)' } },
//   'pulse-border': { '0%, 100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.5)' }, '50%': { boxShadow: '0 0 0 4px rgba(59,130,246,0.2)' } },
//   'fade-in': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
// },
// animation: {
//   shake: 'shake 0.3s linear',
//   'pulse-border': 'pulse-border 0.6s cubic-bezier(0.4,0,0.6,1) infinite',
//   'fade-in': 'fade-in 0.5s ease-out',
// } } }
    )
  }
)
Input.displayName = "Input"

export { Input }
