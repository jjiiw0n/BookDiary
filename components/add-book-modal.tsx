"use client"

import { useState, useEffect } from "react"
import { X, BookOpen, ImageIcon } from "lucide-react"
import { StarRating } from "@/components/star-rating"
import { Book } from "@/lib/mock-books"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AddBookModalProps {
  open: boolean
  onClose: () => void
  onAdd: (book: Omit<Book, "id" | "created_at">) => void
}

const EMPTY_FORM = {
  title: "",
  author: "",
  cover_url: "",
  rating: 0,
  memo: "",
}

export function AddBookModal({ open, onClose, onAdd }: AddBookModalProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [coverError, setCoverError] = useState(false)

  // Reset form on open
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM)
      setCoverError(false)
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return
    onAdd({ ...form })
  }

  const isValid = form.title.trim() && form.author.trim()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-lg bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2
              id="modal-title"
              className="font-serif font-semibold text-foreground text-lg"
            >
              책 추가하기
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Cover preview + URL side by side */}
            <div className="flex gap-4">
              {/* Thumbnail preview */}
              <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-secondary border border-border flex items-center justify-center">
                {form.cover_url && !coverError ? (
                  <Image
                    src={form.cover_url}
                    alt="Cover preview"
                    width={64}
                    height={96}
                    className="object-cover w-full h-full"
                    onError={() => setCoverError(true)}
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
                )}
              </div>

              {/* Cover URL */}
              <div className="flex-1">
                <label
                  htmlFor="cover_url"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  표지 이미지 URL
                </label>
                <input
                  id="cover_url"
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                  value={form.cover_url}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, cover_url: e.target.value }))
                    setCoverError(false)
                  }}
                  className={cn(
                    "w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground",
                    "placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    "transition-colors"
                  )}
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                  책 제목 <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                type="text"
                  placeholder="예) 바람의 이름"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className={cn(
                  "w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground",
                  "placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "transition-colors"
                )}
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                  저자 <span className="text-destructive">*</span>
              </label>
              <input
                id="author"
                type="text"
                  placeholder="예) 패트릭 로스퍼스"
                required
                value={form.author}
                onChange={(e) =>
                  setForm((f) => ({ ...f, author: e.target.value }))
                }
                className={cn(
                  "w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground",
                  "placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "transition-colors"
                )}
              />
            </div>

            {/* Rating */}
            <div>
              <span className="block text-xs font-medium text-muted-foreground mb-2">
                평점
              </span>
              <StarRating
                value={form.rating}
                onChange={(v) => setForm((f) => ({ ...f, rating: v }))}
                size="lg"
              />
            </div>

            {/* Memo */}
            <div>
              <label
                htmlFor="memo"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                  독서 메모
              </label>
              <textarea
                id="memo"
                rows={4}
                  placeholder="이 책이 남긴 생각이나 감정을 자유롭게 적어보세요."
                value={form.memo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, memo: e.target.value }))
                }
                className={cn(
                  "w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground resize-none",
                  "placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "leading-relaxed transition-colors"
                )}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isValid
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              책장에 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
