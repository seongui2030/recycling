
> **서로 다른 프로그램이 약속된 형식으로 대화하기**

API는 프로그램과 프로그램이 약속된 방식으로 대화하기 위한 통로라고 생각할 수 있습니다.

우리 프로젝트에서는:

```text
React
  ↓ JSON
/api/detect
  ↓
Roboflow
```

JSON은 데이터를 표현하는 대표적인 형식입니다.

```json
{
  "image": "data:image/jpeg;base64,..."
}
```

Roboflow가 응답하면 prediction 배열을 받습니다.

```json
{
  "predictions": [
    {
      "class": "book",
      "confidence": 0.94
    }
  ]
}
```

React는 이 데이터를 받아 화면을 그립니다.

## JSON을 읽는 연습

다음 중 품목 이름은 무엇일까요?

```json
{
  "class": "shoes",
  "confidence": 0.88
}
```

정답은 `shoes`입니다.

그렇다면 개수를 계산하려면 같은 `class`가 몇 번 등장하는지 세면 됩니다. 이 간단한 아이디어가 다음 페이지의 집계 함수로 이어집니다.
