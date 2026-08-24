# 07-05. Google Redirect URL 점검

> **로컬 주소와 배포 주소를 모두 생각하기**

OAuth는 주소가 중요합니다.

개발할 때:

```text
http://localhost:5173
```

배포하면:

```text
https://recycling-iota.vercel.app
```

처럼 주소가 달라질 수 있습니다.

Supabase Google 로그인 문서에서도 개발용 localhost와 실제 애플리케이션 URL을 OAuth 설정에 맞게 구성하는 과정을 설명합니다. citeturn0search2

### 점검표

```text
□ Google Auth Platform 설정
□ OAuth Client의 허용 origin 확인
□ Supabase Google Provider 활성화
□ Supabase URL Configuration 확인
□ 로컬 주소 허용
□ Vercel 주소 허용
```

첨부 가이드가 설명하는 핵심은 **Google Cloud와 Supabase가 기대하는 callback 주소를 정확히 맞추는 것**입니다. fileciteturn0file0L155-L161

주소 하나가 틀리면 로그인 전체가 멈출 수 있습니다. 그러므로 복사할 때 주소를 직접 타이핑하기보다 복사해서 붙여 넣는 습관을 권합니다.
