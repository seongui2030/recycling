# 03-02. Supabase 프로젝트 만들기

> **데이터를 저장할 온라인 책장을 준비합니다**

Supabase는 PostgreSQL 데이터베이스와 인증 기능 등을 함께 제공하는 개발 플랫폼입니다.

### 따라 하기

1. Supabase에 로그인합니다.
2. 새 프로젝트를 만듭니다.
3. 프로젝트 이름을 정합니다.
4. 데이터베이스가 준비될 때까지 기다립니다.
5. Project URL과 Publishable Key를 확인합니다.

우리 프로젝트의 클라이언트 코드는 다음 환경변수를 사용합니다.

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

현재 저장소의 `src/supabase.js`도 이 이름을 사용하여 `createClient()`를 호출합니다. fileciteturn8file0

> **주의:** 책의 업로드 시점에 Supabase Dashboard의 명칭이 달라질 수 있습니다. 화면에서 `Publishable key`와 프로젝트 URL을 확인하고, 책의 변수명은 현재 소스코드와 동일하게 유지하세요.
