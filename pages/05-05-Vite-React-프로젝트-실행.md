
> **내 컴퓨터에서 앱을 먼저 열어 보기**

저장소 README에서 안내하는 가장 쉬운 시작 방법은 다음과 같습니다.

```bash
npm install
cp .env.example .env.local
npm run dev
```

그리고 `.env.local`의 DEMO MODE를:

```env
VITE_DEMO_MODE=true
```

로 두면 실제 Roboflow 연결 없이 수업용 결과를 확인할 수 있습니다. fileciteturn9file0

## DEMO MODE가 좋은 이유

처음부터 AI 모델, Supabase, Google 로그인, Vercel을 모두 연결하면 문제가 생겼을 때 어디가 문제인지 알기 어렵습니다.

먼저:

```text
화면 → 사진 → 가짜 AI 결과 → 개수 집계
```

를 확인합니다.

그다음 하나씩 실제 서비스와 연결합니다.

이것을 **점진적 개발**이라고 생각하면 됩니다.
