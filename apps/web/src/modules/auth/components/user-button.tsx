"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"

const userButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },

      layout: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      layout: "horizontal",
    },
  },
)

export interface UserButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof userButtonVariants> {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    avatar?: string | null
  }
  showAvatar?: boolean
  showName?: boolean
  showEmail?: boolean
  showChevron?: boolean
  avatarSize?: "sm" | "md" | "lg"
  fallbackIcon?: React.ReactNode
  loading?: boolean
  truncateText?: boolean
  maxNameLength?: number
  maxEmailLength?: number
  customContent?: React.ReactNode
  onSignOut?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  showDropdown?: boolean
  dropdownAlign?: "start" | "center" | "end"
}

const UserButton = React.forwardRef<HTMLButtonElement, UserButtonProps>(
  (
    {
      className,
      variant,
      size,
      layout,
      user,
      showAvatar = true,
      showName = true,
      showEmail = false,
      showChevron = false,
      avatarSize = "md",
      fallbackIcon,
      loading = false,
      truncateText = true,
      maxNameLength = 20,
      maxEmailLength = 30,
      customContent,
      onSignOut,
      onProfileClick,
      onSettingsClick,
      showDropdown = false,
      dropdownAlign = "end",
      children,
      ...props
    },
    ref,
  ) => {
    const avatarSizes = {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    }

    const getInitials = (name?: string | null) => {
      if (!name) return "U"
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    const truncateString = (str: string, maxLength: number) => {
      if (!truncateText || str.length <= maxLength) return str
      return str.slice(0, maxLength) + "..."
    }

    const displayName = user?.name || user?.email?.split("@")[0] || "User"
    const displayEmail = user?.email || ""
    const avatarSrc = user?.image || user?.avatar

    const getTextStyles = () => {
      switch (variant) {
        case "default":
        case "destructive":
          // Dark button backgrounds - always use white text
          return {
            name: { color: "#ffffff" },
            email: { color: "rgba(255, 255, 255, 0.8)" },
            icon: { color: "rgba(255, 255, 255, 0.6)" },
          }
        case "secondary":
        case "outline":
        case "ghost":
        case "link":
        default:
          // Light button backgrounds - use high contrast colors
          return {
            name: { color: "#000000" },
            email: { color: "rgba(0, 0, 0, 0.7)" },
            icon: { color: "rgba(0, 0, 0, 0.6)" },
          }
      }
    }

    const textStyles = getTextStyles()

    if (loading) {
      return (
        <Button className={cn(userButtonVariants({ variant, size, layout, className }))} disabled ref={ref} {...props}>
          {showAvatar && <div className={cn("animate-pulse bg-muted rounded-full", avatarSizes[avatarSize])} />}
          <div className={cn("space-y-1", layout === "vertical" ? "text-center" : "")}>
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
            {showEmail && <div className="h-3 w-24 bg-muted animate-pulse rounded" />}
          </div>
        </Button>
      )
    }

    if (customContent) {
      return (
        <Button className={cn(userButtonVariants({ variant, size, layout, className }))} ref={ref} {...props}>
          {customContent}
        </Button>
      )
    }

    if (showDropdown) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={cn(userButtonVariants({ variant, size, layout, className }))} ref={ref} {...props}>
              {showAvatar && (
                <Avatar className={avatarSizes[avatarSize]}>
                  <AvatarImage src={avatarSrc || undefined} alt={displayName} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground font-medium">
                    {fallbackIcon || getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "flex flex-col items-start min-w-0",
                  layout === "vertical" ? "text-center items-center" : "",
                  layout === "horizontal" && size === "icon" ? "hidden" : "",
                )}
              >
                {showName && (
                  <span className="text-sm font-medium leading-none truncate" style={textStyles.name}>
                    {truncateString(displayName, maxNameLength)}
                  </span>
                )}
                {showEmail && displayEmail && (
                  <span className="text-xs truncate" style={textStyles.email}>
                    {truncateString(displayEmail, maxEmailLength)}
                  </span>
                )}
              </div>

              {children}

              {showChevron && <ChevronDown className="h-4 w-4" style={textStyles.icon} />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dropdownAlign} className="w-56">
            {onProfileClick && (
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            )}
            {onSettingsClick && (
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            )}
            {(onProfileClick || onSettingsClick) && onSignOut && <DropdownMenuSeparator />}
            {onSignOut && (
              <DropdownMenuItem onClick={onSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Button className={cn(userButtonVariants({ variant, size, layout, className }))} ref={ref} {...props}>
        {showAvatar && (
          <Avatar className={avatarSizes[avatarSize]}>
            <AvatarImage src={avatarSrc || undefined} alt={displayName} />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground font-medium">
              {fallbackIcon || getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={cn(
            "flex flex-col items-start min-w-0",
            layout === "vertical" ? "text-center items-center" : "",
            layout === "horizontal" && size === "icon" ? "hidden" : "",
          )}
        >
          {showName && (
            <span className="text-sm font-medium leading-none truncate" style={textStyles.name}>
              {truncateString(displayName, maxNameLength)}
            </span>
          )}
          {showEmail && displayEmail && (
            <span className="text-xs truncate" style={textStyles.email}>
              {truncateString(displayEmail, maxEmailLength)}
            </span>
          )}
        </div>

        {children}

        {showChevron && <ChevronDown className="h-4 w-4" style={textStyles.icon} />}
      </Button>
    )
  },
)

UserButton.displayName = "UserButton"

export { UserButton, userButtonVariants }
