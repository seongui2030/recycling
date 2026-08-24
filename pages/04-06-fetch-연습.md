# 04-06. fetch로 API 호출하기

> **브라우저에서 서버로 부탁 편지를 보내기**

JavaScript의 `fetch()`는 웹에서 HTTP 요청을 보내는 대표적인 방법입니다.

우리 프로젝트에서는:

```javascript
const res = await fetch('/api/detect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ image: dataUrl }),
})
```

를 사용합니다. fileciteturn6file0

### 세 줄로 기억하기

```text
fetch → 서버에 요청
await  → 응답을 기다림
json() → JSON 데이터로 읽음
```

예:

```javascript
const json = await res.json()
```

### 학생 실험

브라우저 개발자 도구의 Network 탭을 열고 사진을 선택해 봅니다.

요청이 발생했는지 확인합니다.

이때 개발자 도구를 “전문 개발자만 쓰는 화면”으로 생각하지 마세요. **브라우저가 실제로 무엇을 했는지 관찰하는 실험실**입니다.
