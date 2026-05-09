"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0)

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const gapClasses = {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1.5",
  }

  const active = hovered || value

  return (
    <div
      className={cn("flex items-center", gapClasses[size])}
      onMouseLeave={() => !readonly && setHovered(0)}
      role={readonly ? undefined : "radiogroup"}
      aria-label="별점"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          className={cn(
            "transition-transform focus:outline-none",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
          aria-label={readonly ? undefined : `${star}점`}
        >
          <Star
            className={cn(
              sizeClasses[size],
              "transition-colors",
              star <= active
                ? "fill-star text-star"
                : "fill-star-empty text-star-empty"
            )}
          />
        </button>
      ))}
    </div>
  )
}
