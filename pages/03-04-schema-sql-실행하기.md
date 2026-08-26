
> **준비된 설계도를 한 번에 데이터베이스에 적용합니다**

저장소의 `supabase/schema.sql`에는 테이블, 제약조건, RLS 정책, 신규 사용자 profile 생성 trigger가 들어 있습니다. fileciteturn10file0

## 따라 하기

1. Supabase Dashboard에서 SQL Editor를 엽니다.
2. 프로젝트의 `supabase/schema.sql` 내용을 엽니다.
3. 전체 SQL을 복사합니다.
4. SQL Editor에 붙여 넣습니다.
5. Run을 누릅니다.
6. Table Editor에서 `profiles`, `donations`, `donation_items`를 확인합니다.

## SQL을 무서워하지 마세요

다음 문장은 테이블을 만든다는 뜻입니다.

```sql
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  total_count integer not null default 0
);
```

- `create table` → 표 만들기
- `primary key` → 각 행을 구분하는 값
- `references` → 다른 표와 연결
- `default` → 값을 생략했을 때 기본값

처음에는 모든 문법을 외우지 않아도 됩니다. **복사 → 실행 → 결과 확인**을 먼저 경험하세요.
