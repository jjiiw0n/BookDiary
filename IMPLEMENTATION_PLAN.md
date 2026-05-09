# Supabase 연동 구현 계획서

## 1. 개요
현재 메모리(useState) 기반인 '나의 독서 일지' 앱에 Supabase 백엔드를 연동하여 데이터 영속성을 확보합니다.

## 2. 주요 작업 순서

### Phase 1: 환경 설정 및 클라이언트 초기화
- [ ] `.env.local` 파일 확인 (완료)
- [ ] `lib/supabase.ts` 생성: Supabase 클라이언트 싱글톤 인스턴스 초기화

### Phase 2: 데이터 모델 및 타입 동기화
- [ ] `lib/mock-books.ts`의 `Book` 인터페이스를 Supabase 테이블 구조와 일치하도록 검토 (ID 타입 등)

### Phase 3: UI 컴포넌트 로직 전환 (`app/page.tsx`)
- [ ] **Read**: `useEffect`를 사용하여 앱 로드 시 Supabase에서 책 목록 가져오기
- [ ] **Create**: `handleAddBook` 함수를 Supabase `insert` 로직으로 변경
- [ ] **Delete**: `handleDeleteBook` 함수를 Supabase `delete` 로직으로 변경
- [ ] **Loading 상태**: 데이터 로딩 중임을 알리는 스피너 또는 Skeleton UI 연동

### Phase 4: 오류 처리 및 최적화
- [ ] API 호출 실패 시 에러 메시지 표시 (Toast 활용)
- [ ] 낙관적 업데이트(Optimistic Update) 적용 검토 (선택 사항)

## 3. 예상 변경 파일
- `lib/supabase.ts` (신규)
- `app/page.tsx` (수정)
- `schema.sql` (신규)

---
준비가 되면 첫 번째 단계인 `lib/supabase.ts` 생성부터 시작하겠습니다.
