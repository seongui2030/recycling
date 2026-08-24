# 07-03. Environment Variables 등록

> **배포 환경에도 설정값을 넣어 줍니다**

로컬의 `.env.local`은 내 컴퓨터에서만 적용됩니다.

Vercel에 배포하면 Vercel의 프로젝트 설정에도 환경변수를 등록해야 합니다.

### 브라우저에서 필요한 값

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_DEMO_MODE=false
```

### 서버에서 필요한 값

```env
ROBOFLOW_API_KEY=...
ROBOFLOW_MODEL_ID=recycling-items/1
```

저장소 README도 Vercel 환경변수에 이 네 종류의 값을 넣는 흐름을 안내합니다. fileciteturn9file0

### 주의

환경변수는 이름이 한 글자라도 다르면 프로그램에서 `undefined`가 될 수 있습니다.

```text
VITE_SUPABASE_URL
```

과

```text
VITE_SUPABASE_URLS
```

는 완전히 다른 이름입니다.

등록 후에는 **Redeploy**가 필요한 경우가 있습니다. 첨부 로그인 가이드도 Vercel 환경변수를 새로 등록한 뒤 재배포하는 과정을 강조합니다. fileciteturn0file0L163-L171
