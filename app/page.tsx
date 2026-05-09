"use client"

import { useState, useEffect } from "react"
import { Plus, BookOpen, Search, Loader2 } from "lucide-react"
import { Book } from "@/lib/mock-books"
import { BookCard } from "@/components/book-card"
import { BookDetailView } from "@/components/book-detail-view"
import { AddBookModal } from "@/components/add-book-modal"
import { EmptyState } from "@/components/empty-state"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function ReadingLogPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState("")

  // Fetch books from Supabase
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (error: any) {
      console.error('Error fetching books:', error.message)
      toast.error('책 목록을 가져오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddBook = async (data: Omit<Book, "id" | "created_at">) => {
    try {
      const { data: newBook, error } = await supabase
        .from('books')
        .insert([data])
        .select()
        .single()

      if (error) throw error

      setBooks((prev) => [newBook, ...prev])
      setModalOpen(false)
      toast.success('책이 성공적으로 추가되었습니다.')
    } catch (error: any) {
      console.error('Error adding book:', error.message)
      toast.error('책 추가에 실패했습니다.')
    }
  }

  const handleDeleteBook = async (id: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (error) throw error

      setBooks((prev) => prev.filter((b) => b.id !== id))
      setSelectedBook(null)
      toast.success('책이 삭제되었습니다.')
    } catch (error: any) {
      console.error('Error deleting book:', error.message)
      toast.error('책 삭제에 실패했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-serif font-bold text-foreground text-lg leading-none">
                나의 독서 일지
              </span>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">책 추가</span>
            <span className="sm:hidden">추가</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {selectedBook ? (
          <BookDetailView
            book={selectedBook}
            onBack={() => setSelectedBook(null)}
            onDelete={handleDeleteBook}
          />
        ) : (
          <>
            {/* Page title + stats */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground mb-1">
                  내 책장
                </h1>
                <p className="text-muted-foreground text-sm">
                  {loading ? "불러오는 중..." : books.length === 0
                    ? "아직 기록된 책이 없습니다"
                    : `총 ${books.length}권 기록됨`}
                </p>
              </div>

              {/* Search */}
              {!loading && books.length > 0 && (
                <div className="relative max-w-64 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="제목 또는 저자 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Grid or empty */}
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm">기록을 불러오고 있습니다...</p>
              </div>
            ) : books.length === 0 ? (
              <EmptyState onAddBook={() => setModalOpen(true)} />
            ) : filteredBooks.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground text-sm">
                  &ldquo;{search}&rdquo;에 해당하는 책이 없습니다
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Book Modal */}
      <AddBookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddBook}
      />
    </div>
  )
}

