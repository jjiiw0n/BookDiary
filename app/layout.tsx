import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: '나의 독서 일지',
  description: '책, 메모, 별점을 기록하는 나만의 독서 일지.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${lora.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
