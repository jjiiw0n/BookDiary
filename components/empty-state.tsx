import { BookOpen } from "lucide-react"

interface EmptyStateProps {
  onAddBook: () => void
}

export function EmptyState({ onAddBook }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Decorative icon container */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-primary/40" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent/60" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-primary/20" />
      </div>

      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2 text-balance">
        책장이 비어 있습니다
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8 text-pretty">
        나만의 독서 기록을 시작해보세요. 첫 번째 책을 추가하고 그 책이 남긴 생각을 기록해 두세요.
      </p>

      <button
        onClick={onAddBook}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        첫 번째 책 추가하기
      </button>
    </div>
  )
}
