
> **AI의 사각형을 사진 위에 그려 보기**

Roboflow prediction에는 물체의 중심 위치와 크기가 들어 있습니다.

```text
x, y
width, height
```

브라우저에서는 이미지 크기를 기준으로 퍼센트로 바꾸어 사각형을 그릴 수 있습니다.

현재 `App.jsx`는 다음과 같은 계산을 합니다.

```javascript
const left = ((p.x - p.width / 2) / iw) * 100
const top = ((p.y - p.height / 2) / ih) * 100
const width = (p.width / iw) * 100
const height = (p.height / ih) * 100
```

그리고 CSS의 `left`, `top`, `width`, `height`로 박스를 표시합니다. fileciteturn6file0

## 왜 퍼센트인가요?

사진의 실제 픽셀 크기가 달라져도 박스가 이미지 크기에 맞춰 움직이게 하기 위해서입니다.

즉:

```text
AI 좌표
→ 이미지 기준 비율
→ CSS 위치
→ 화면 위 Bounding Box
```

가 됩니다.
