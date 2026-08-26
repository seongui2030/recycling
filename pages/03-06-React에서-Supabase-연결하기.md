
> **웹앱이 데이터베이스와 대화하도록 만들기**

현재 프로젝트의 `src/supabase.js`는 `createClient()`로 Supabase 클라이언트를 만듭니다. fileciteturn8file0

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
```

여기서 중요한 것은 세 가지입니다.

1. URL은 어느 Supabase 프로젝트인지 알려 줍니다.
2. Publishable key는 클라이언트가 Supabase와 통신할 때 사용합니다.
3. 로그인 세션은 브라우저에 유지되도록 설정합니다.

Supabase 공식 문서에서도 브라우저에서 `createClient`를 사용하고 OAuth 인증을 연결하는 흐름을 안내합니다. citeturn0search2

## 확인

VS Code에서 `src/supabase.js`를 열고 변수명이 `.env.local`의 이름과 정확히 같은지 확인하세요.
