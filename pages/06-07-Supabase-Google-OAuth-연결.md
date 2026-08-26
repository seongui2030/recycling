
> **Google → Supabase → 우리 앱**

첨부 가이드의 핵심 흐름은 다음과 같습니다.

```text
학생 브라우저
   ↓ Google 로그인
Google
   ↓ 인증 결과
Supabase Auth
   ↓ 세션
브라우저
   ↓
기부 비서
```

가이드에서는 Google Client ID/Secret, Supabase URL, Publishable/Anon 계열 키, User JWT를 각각 다른 역할로 구분합니다. fileciteturn0file0L51-L66

## 코드

```javascript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: window.location.origin,
  },
})
```

Supabase 공식 문서의 Google 로그인 예제 역시 `provider: 'google'`을 사용합니다. citeturn0search2

## Redirect URL

OAuth에서 가장 많이 만나는 문제가 redirect 설정입니다.

개념적으로:

```text
Google 인증 완료
→ 허용된 callback
→ Supabase Auth
→ 허용된 앱 URL
```

의 흐름이 맞아야 합니다.

첨부 가이드에서도 `redirect_uri_mismatch`의 원인을 Google Cloud의 승인된 리디렉션 URI와 Supabase 주소가 일치하지 않는 경우로 설명합니다. fileciteturn0file0L155-L161
