# 06-11. useMemo로 계산 결과 기억하기

> **반복 계산을 한곳에 정리하기**

현재 `App.jsx`에서는 다음과 같은 코드를 사용합니다.

```javascript
const counts = useMemo(
  () => groupPredictions(result?.predictions || []),
  [result],
)
```

`useMemo`는 특정 값이 바뀌었을 때 계산 결과를 다시 만들도록 도와줍니다.

초보 학생은 “반드시 useMemo를 써야 한다”고 외울 필요는 없습니다.

이번 수업의 핵심은:

```text
result가 바뀐다
→ predictions를 다시 계산한다
→ counts가 바뀐다
→ 화면 숫자가 바뀐다
```

라는 데이터 흐름입니다.

### 작은 질문

`result`가 바뀌지 않았는데 매번 같은 계산을 다시 한다면 어떤 문제가 있을까요?

앱이 작을 때는 큰 문제가 아닐 수 있지만, 데이터가 커지면 계산 비용을 생각해야 합니다.
