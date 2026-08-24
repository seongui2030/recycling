# 03-05. Row Level Security 이해하기

> **내 기부 기록을 다른 사람이 함부로 보지 못하게**

데이터베이스에 저장했다고 안전한 것은 아닙니다.

우리 앱에서는 사용자가 자신의 기부 기록만 다루도록 제한합니다. 이를 위해 Supabase의 Row Level Security, 즉 RLS를 사용합니다.

현재 `schema.sql`에서는 `profiles`, `donations`, `donation_items`에 RLS를 활성화하고, `auth.uid()`를 이용하여 로그인한 사용자의 행만 허용하는 정책을 작성합니다. fileciteturn10file0

Supabase 공식 문서도 RLS 정책을 데이터베이스의 행에 적용되는 규칙으로 설명하며, `auth.uid()`를 사용해 현재 로그인 사용자의 ID를 정책에 활용하는 예를 제공합니다. citeturn0search1

대표적인 형태는 다음과 같습니다.

```sql
create policy "Users can view their own profile."
on profiles
for select
to authenticated
using ((select auth.uid()) = user_id);
```

우리 프로젝트에서는 `donations`의 `user_id`와 로그인 사용자의 ID가 같은지 확인합니다.

### 수업 질문

“URL에 기부 ID를 직접 입력하면 다른 사람의 기부 기록을 볼 수 있을까?”

좋은 웹 서비스라면 **볼 수 없어야 합니다.**

바로 이런 문제를 해결하기 위해 데이터베이스 보안 규칙이 필요합니다.
