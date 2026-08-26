
> **화면을 작은 조각으로 생각하기**

## 🤝 사람이 사용할 수 있는 AI로

SDG 9의 기술은 결국 사람을 위한 서비스가 되어야 합니다. React로 화면을 만들고 Google 로그인과 Human-in-the-loop를 구현하면서 **AI가 판단하고 사람이 확인하는 협력 구조**를 경험합니다.


React는 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다.

Vite는 개발과 빌드를 편리하게 해 주는 도구입니다.

우리 프로젝트의 시작점은 `src/main.jsx`이고 실제 화면은 `App.jsx`가 담당합니다. 저장소의 src 구조를 보면 `App.jsx`, `main.jsx`, `styles.css`, `supabase.js`가 핵심 파일로 나뉘어 있습니다. fileciteturn5file0

## React의 기본 생각

화면은 현재 데이터 상태에 따라 달라집니다.

```text
user = null
→ Google 로그인 버튼

user = 로그인 사용자
→ 프로필 + 로그아웃 버튼
```

사진도 마찬가지입니다.

```text
imageUrl = ''
→ 촬영 버튼

imageUrl 있음
→ 사진 표시

result 있음
→ 검출 결과와 개수 표시
```

이처럼 React에서는 **상태가 바뀌면 화면이 바뀐다**는 생각이 중요합니다.
