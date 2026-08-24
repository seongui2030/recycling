# 04-05. 왜 Roboflow 키는 서버에 둘까요

> **브라우저에 비밀을 보여 주지 않는 습관**

브라우저에서 실행되는 JavaScript는 사용자가 어느 정도 확인할 수 있습니다.

따라서 다음처럼 작성하면 안 됩니다.

```env
VITE_ROBOFLOW_API_KEY=비밀키
```

`VITE_` 변수는 클라이언트 코드에서 사용할 수 있기 때문에 비밀 API Key를 넣는 용도로 적합하지 않습니다.

우리 프로젝트는 대신:

```env
ROBOFLOW_API_KEY=비밀키
ROBOFLOW_MODEL_ID=recycling-items/1
```

를 서버 환경변수로 두고 `/api/detect`에서 읽습니다. fileciteturn7file0

Vercel은 Vite 프로젝트에서 `api` 디렉터리의 파일을 Vercel Function으로 사용할 수 있는 방식을 안내합니다. citeturn1search0

### 보안의 기본 원칙

**사용자에게 보여 줘도 되는 값과 보여 주면 안 되는 값을 구분합니다.**

- Supabase 프로젝트 URL → 클라이언트에서 사용
- Supabase Publishable Key → 클라이언트에서 사용
- Roboflow API Key → 서버 환경변수
- Google Client Secret → 서비스 설정 영역에서 비밀 유지

이 원칙 하나만 기억해도 초보 개발자의 많은 실수를 예방할 수 있습니다.
