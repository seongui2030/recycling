
> **AI 공장에 첫 번째 작업장을 만듭니다**

Roboflow에서는 사진을 모으고, 라벨을 붙이고, 데이터셋 버전을 만들고, 모델을 학습하고, 테스트할 수 있습니다.

## 따라 하기

1. Roboflow에 로그인합니다.
2. 새 Workspace 또는 수업용 Workspace를 선택합니다.
3. 새 프로젝트를 만듭니다.
4. Project Type은 **Object Detection**을 선택합니다.
5. 프로젝트 이름을 `recycling-items`로 정합니다.
6. 6개 class 이름을 준비합니다.

저장소 README에도 `recycling-items` Object Detection 프로젝트를 만드는 과정과 6개 class가 설명되어 있습니다. fileciteturn9file0

## Roboflow 메뉴를 작업실로 이해하기

- **Upload Data**: 공부할 사진을 넣는 곳
- **Annotate**: 사진에 정답 상자를 그리는 곳
- **Dataset**: 공부 자료를 정리하는 곳
- **Versions**: 학습용 버전을 만드는 곳
- **Analytics**: 데이터 통계를 살펴보는 곳
- **Train**: AI를 학습시키는 곳
- **Test**: 새로운 사진으로 시험하는 곳

처음부터 모든 메뉴를 외우지 않아도 됩니다. 우리 수업에서는 **사진 → 라벨 → 버전 → 학습 → 테스트 → API** 순서만 기억하면 충분합니다.
