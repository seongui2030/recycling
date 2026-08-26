
> **로그인한 사람이 누구인지 확인하기**

로그인이 성공했다는 것은 “사용자 확인이 끝났다”는 뜻입니다. 이제 앱은 그 사용자가 누구인지 알아야 합니다.

첨부 가이드에서는 `supabase.auth.getUser()`를 이용해 로그인 사용자를 확인하는 예제를 보여 줍니다. fileciteturn0file0L105-L140

현재 프로젝트의 저장 코드도:

```javascript
const { data: auth } = await supabase.auth.getUser()
const currentUser = auth?.user
```

를 사용합니다. fileciteturn6file0

그리고 `currentUser.id`를 `donations.user_id`에 저장합니다.

## 세션 변화 감지

프로젝트는 `onAuthStateChange`도 사용합니다.

```javascript
supabase.auth.onAuthStateChange((event, session) => {
  setUser(session?.user ?? null)
})
```

첨부 가이드에서도 로그인/로그아웃 상태 변경을 감지하는 같은 개념의 코드를 설명합니다. fileciteturn0file0L122-L140

## 기억하기

```text
signInWithOAuth → 로그인 시작
getUser        → 현재 사용자 확인
onAuthStateChange → 로그인 상태 변화 감지
signOut        → 로그아웃
```
