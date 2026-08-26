
> **Google 계정을 앱의 출입증으로 사용하기**

첨부된 ‘구글 로그인 완벽 가이드’에서는 Google 로그인 과정을 놀이공원 입장권에 비유합니다. 브라우저가 Google 인증을 거치고 Supabase가 세션을 관리한 뒤 사용자가 앱에 들어오는 흐름입니다. fileciteturn0file0L8-L33

현재 프로젝트의 로그인 코드는:

```javascript
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: window.location.origin },
})
```

형태입니다. fileciteturn6file0

Supabase 공식 문서도 `signInWithOAuth({ provider: 'google' })` 방식과 redirect 설정을 안내합니다. citeturn0search0turn0search2

## 준비할 것

- Google Cloud 프로젝트
- OAuth Client
- Supabase Google Provider 활성화
- 로컬 주소와 배포 주소
- Supabase Auth URL 설정

이 단계에서는 코드를 먼저 바꾸지 말고 **인증 서비스 사이의 주소 관계**를 이해합니다.
