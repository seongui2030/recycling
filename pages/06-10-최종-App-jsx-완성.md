# 06-10. 최종 App.jsx 완성

> **이제 여러 기술이 하나의 앱으로 만납니다**

현재 저장소의 `App.jsx`는 다음 기능을 하나로 묶습니다.

- Google 로그인
- OAuth callback 세션 복원
- 사진 선택
- DEMO MODE
- `/api/detect` 호출
- prediction 표시
- class별 집계
- `+ / −` 수동 수정
- Supabase 기부 저장
- 로그인 사용자 확인
- 로그아웃
- 메시지 표시

즉, 파일 하나를 읽어도 웹 서비스 전체의 흐름을 볼 수 있습니다. fileciteturn6file0

### 완성 전 확인

```text
□ npm install 성공
□ npm run dev 성공
□ 사진 선택 성공
□ DEMO MODE 결과 표시
□ 품목 개수 표시
□ + 버튼 작동
□ − 버튼 작동
□ Supabase 연결
□ Google 로그인
□ 기부 등록
```

### 마지막으로 꼭 확인할 것

학생 여러분이 처음부터 이 코드를 모두 작성하지 않았다고 해서 실력이 없는 것이 아닙니다.

중요한 것은 이제 각 부분을 설명할 수 있는가입니다.

- 왜 `useState`를 쓰나요?
- 왜 `fetch`를 쓰나요?
- 왜 `/api/detect`가 필요한가요?
- 왜 Supabase에 두 테이블을 저장하나요?
- 왜 로그인한 사용자의 ID를 저장하나요?

이 질문에 답하면서 코드에 자기 이름을 붙여 보세요.
