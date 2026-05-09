"use client"

import Image from "next/image"
import { ArrowLeft, Trash2, CalendarDays } from "lucide-react"
import { Book } from "@/lib/mock-books"
import { StarRating } from "@/components/star-rating"

interface BookDetailViewProps {
  book: Book
  onBack: () => void
  onDelete: (id: string) => void
}

export function BookDetailView({ book, onBack, onDelete }: BookDetailViewProps) {
  const formattedDate = new Date(book.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleDelete = () => {
    if (confirm(`"${book.title}"을(를) 책장에서 삭제하시겠습니까?`)) {
      onDelete(book.id)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Back nav */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        책장으로 돌아가기
      </button>

      <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
        {/* Cover */}
        <div className="flex-shrink-0">
          <div className="relative w-40 sm:w-48 h-60 sm:h-72 rounded-xl overflow-hidden shadow-lg bg-secondary border border-border mx-auto sm:mx-0">
            <Image
              src={book.cover_url}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 160px, 192px"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://placehold.co/300x450/e8e0d4/1e2a4a?text=No+Cover"
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              독서 기록
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{book.author}</p>

          <div className="flex items-center gap-3 mb-6">
            <StarRating value={book.rating} readonly size="md" />
            <span className="text-sm text-muted-foreground">
              {book.rating}/5
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{formattedDate} 기록</span>
          </div>

          {/* Memo */}
          {book.memo ? (
            <div className="bg-secondary/60 border border-border rounded-xl p-5">
              <h2 className="font-serif font-semibold text-foreground text-sm uppercase tracking-wide mb-3">
                나의 메모
              </h2>
              <p className="text-foreground leading-relaxed text-sm sm:text-base">
                {book.memo}
              </p>
            </div>
          ) : (
            <div className="bg-secondary/40 border border-dashed border-border rounded-xl p-5 text-center">
              <p className="text-muted-foreground text-sm italic">
                아직 작성된 메모가 없습니다.
              </p>
            </div>
          )}

          {/* Delete */}
          <div className="mt-8 pt-6 border-t border-border">
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors focus:outline-none group"
            >
              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              책장에서 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
