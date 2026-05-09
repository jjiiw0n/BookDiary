export interface Book {
  id: string
  title: string
  author: string
  cover_url: string
  rating: number
  memo: string
  created_at: string
}

export const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "바람의 이름",
    author: "패트릭 로스퍼스",
    cover_url: "https://covers.openlibrary.org/b/id/8353835-L.jpg",
    rating: 5,
    memo: "완전히 매혹적인 소설. 코스가 들려주는 이야기는 언어적 아름다움으로 가득 차 있어, 문장 자체가 음악처럼 느껴진다. 액자식 구성이 더하는 우수 어린 깊이 덕분에 앞으로 펼쳐질 이야기가 더 간절하게 기다려진다. 문장 하나하나를 음미하며 천천히 읽게 만든 드문 책.",
    created_at: "2025-11-02T10:00:00Z",
  },
  {
    id: "2",
    title: "피라네시",
    author: "수잔나 클라크",
    cover_url: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    rating: 5,
    memo: "완전히 독보적인 독서 경험. 무한한 복도와 조각상들로 가득한 집이 너무나 생생하게 실재했다. 클라크는 놀라운 인내심으로 미스터리를 쌓아 올리고 마침내 완벽하게 보상해 준다. 단숨에 읽고 나서 바로 다시 읽고 싶었던 책.",
    created_at: "2025-10-15T14:30:00Z",
  },
  {
    id: "3",
    title: "편의점 인간",
    author: "무라타 사야카",
    cover_url: "https://covers.openlibrary.org/b/id/9255031-L.jpg",
    rating: 4,
    memo: "조용하지만 날카롭게 빛나는 소설. 게이코의 시선으로 바라본 사회와 '정상성'에 대한 통찰이 예리하다. 빠르게 읽히지만 읽고 난 뒤 몇 주 동안 순응과 정체성에 대해 계속 생각하게 만들었다.",
    created_at: "2025-09-20T09:00:00Z",
  },
  {
    id: "4",
    title: "배움의 발견",
    author: "타라 웨스트오버",
    cover_url: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    rating: 4,
    memo: "소설처럼 읽히는 회고록. 생존주의자 가정에서 케임브리지까지의 타라의 여정은 놀랍도록 경이롭다. 때로는 믿기 어려울 만큼 극적이지만, 그 감정적 진실이 모든 것을 단단하게 붙들어 준다. 깊이 감동적인 책.",
    created_at: "2025-08-05T16:00:00Z",
  },
  {
    id: "5",
    title: "모스크바의 신사",
    author: "아모르 타울스",
    cover_url: "https://covers.openlibrary.org/b/id/8739162-L.jpg",
    rating: 5,
    memo: "순수한 우아함. 메트로폴 호텔에서 연금된 채 살아가는 로스토프 백작의 이야기는 품위, 목적, 그리고 제약 속에서 의미를 찾는 것에 대한 묵상이다. 문체가 따뜻하고 재치 있다. 흐린 날에 꺼내 읽고 싶은 책.",
    created_at: "2025-07-12T11:00:00Z",
  },
  {
    id: "6",
    title: "나를 보내지 마",
    author: "가즈오 이시구로",
    cover_url: "https://covers.openlibrary.org/b/id/8375996-L.jpg",
    rating: 4,
    memo: "서늘하게 조용한 소설. 공포가 너무나 천천히 스며들어 무너질 때까지 알아채지 못한다. 이시구로의 절제된 문체가 비극을 견딜 수 없을 만큼 인간적으로 만든다. 마지막 장에서 눈물이 났다.",
    created_at: "2025-06-28T13:45:00Z",
  },
]
