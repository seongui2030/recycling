
> **AI의 판단과 사람의 판단을 연결하기**

우리 프로젝트의 중요한 기능은 `adjustCount()`입니다.

```javascript
function adjustCount(category, delta) {
  // AI prediction을 바꾸어 최종 개수를 조정
}
```

+ 버튼을 누르면 해당 class의 prediction을 하나 추가하고, − 버튼을 누르면 마지막 해당 prediction을 하나 제거합니다. fileciteturn6file0

## 왜 prediction을 직접 수정할까요?

이 프로젝트에서는 최종적으로 필요한 값이 **품목별 개수**이기 때문입니다.

실제 서비스에서는 더 정교하게:

```text
AI 검출 결과
→ 사람이 확인
→ 승인/수정
→ 최종 결과 객체
→ DB 저장
```

구조로 발전시킬 수 있습니다.

## AI 윤리 질문

“AI가 틀린 것을 발견했는데 사람이 수정할 수 없다면 그 서비스는 안전할까요?”

기능 하나가 곧 AI 윤리 교육이 됩니다.
