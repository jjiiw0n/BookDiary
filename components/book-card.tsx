"use client"

import Image from "next/image"
import { Book } from "@/lib/mock-books"
import { StarRating } from "@/components/star-rating"
import { cn } from "@/lib/utils"

interface BookCardProps {
  book: Book
  onClick: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group bg-card border border-border rounded-xl overflow-hidden cursor-pointer",
        "transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
      )}
    >
      {/* Cover */}
      <div className="relative w-full aspect-[2/3] bg-secondary overflow-hidden">
        <Image
          src={book.cover_url}
          alt={`Cover of ${book.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              "https://placehold.co/300x450/e8e0d4/1e2a4a?text=No+Cover"
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-1.5">
        <h3 className="font-serif font-semibold text-foreground leading-snug line-clamp-2 text-balance">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <StarRating value={book.rating} readonly size="sm" />
      </div>
    </article>
  )
}
