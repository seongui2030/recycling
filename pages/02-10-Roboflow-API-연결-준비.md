# 02-10. Roboflow API 연결 준비

> **브라우저와 AI 모델 사이에 서버를 하나 놓습니다**

이제 학습한 모델을 웹앱에서 사용합니다.

우리 프로젝트에서는 브라우저가 Roboflow에 직접 비밀키를 보내지 않습니다.

```text
브라우저
  ↓ POST /api/detect
Vercel Function
  ↓ API Key
Roboflow
  ↓ prediction JSON
Vercel Function
  ↓
브라우저
```

저장소의 `api/detect.js`는 POST 요청만 받고, `ROBOFLOW_API_KEY`와 `ROBOFLOW_MODEL_ID`를 서버 환경변수에서 읽어 Roboflow의 inference endpoint를 호출합니다. fileciteturn7file0

핵심 환경변수는 다음과 같습니다.

```env
ROBOFLOW_API_KEY=발급받은_키
ROBOFLOW_MODEL_ID=recycling-items/1
```

그리고 브라우저에서는:

```env
VITE_DEMO_MODE=false
```

로 실제 API를 사용합니다.

### 중요한 보안 규칙

`VITE_`가 붙은 변수는 Vite 클라이언트 코드에서 사용할 수 있으므로 비밀 API Key를 넣으면 안 됩니다. Vercel의 Vite 안내에서도 브라우저에서 사용할 환경변수는 `VITE` 접두사를 통해 노출되는 구조를 설명합니다. citeturn1search0

이제 서버와 브라우저의 역할을 자세히 알아보겠습니다.
