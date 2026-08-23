# recycling — AI 기부물품 자동 인식·집계

고등학교 「인공지능 기초」의 컴퓨터 비전과 UN SDGs 12를 연결한 수행평가용 모바일 중심 반응형 웹앱입니다.

## 목표
기부자가 가져온 기부 가능 물품을 스마트폰으로 촬영하면:
1. AI Object Detection으로 품목을 찾는다.
2. `class`를 품목명(tag)으로 사용한다.
3. 동일 tag의 개수를 합산한다.
4. 사람이 결과를 확인·수정한다.
5. Supabase에 최종 기부 내역을 저장한다.

## 6개 클래스
`clothes`, `shoes`, `book`, `kitchenware`, `small_appliance`, `bag`

## 1. 가장 쉬운 실행 — DEMO MODE

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`에서 아래 값을 유지합니다.

```env
VITE_DEMO_MODE=true
```

스마트폰으로 같은 Wi-Fi의 PC에 접속하거나 PC 브라우저의 모바일 화면으로 UI를 테스트할 수 있습니다.

## 2. 실제 Roboflow 연결

Roboflow에서 Object Detection 프로젝트를 만들고 6개 class를 라벨링한 뒤 모델을 학습합니다.
### 확장팩 설치 :Image downloader - Imageye
-  3점 >> 확장 프로그램 >> Chrom Web store 방문하기 > "mage downloader - Imageye" 검색 >> 크롬에 추가 >> 핀고정 
- `clothes`, `shoes`, `book`, `kitchenware`, `small_appliance`, `bag` 검색
• 미리보기 격자 제공
• 해상도/크기/형식별 필터링
• WebP를 JPG/PNG로 변환 가능

Roboflow의 Foundation Models(기반 모델) 탭에 들어있는 모델들은 사용자가 일일이 사진을 박스로 치며 라벨링(Labeling)하지 않아도, AI가 사전에 학습한 지식을 바탕으로 자동 라벨링(Auto Label)을 도와주는 사전 학습 모델들입니다.

각 모델은 생성하는 라벨의 형태와 방식에 차이가 있습니다.

SAM 3 (Masks)

라벨 유형: Mask (비트맵 마스크)

설명: Meta의 SAM(Segment Anything Model) 3 기반 모델입니다. 물체의 정밀한 외곽 형태(Pixel-level)를 색칠하듯 덮는 마스크 데이터 형태로 자동 라벨링을 수행합니다. RLE 압축 방식을 사용해 용량을 최소화합니다.

용도: 세그멘테이션(Segmentation) 작업 시 객체의 완벽한 형태 영역을 딸 때 적합합니다.

SAM 3 (Polygons)

라벨 유형: Polygon (다각형)

설명: 동일하게 SAM 3 모델을 사용하지만, 마스크 대신 다각형 점(Point) 연결선 형태로 외곽선을 생성합니다.

용도: 마스크 형태보다 수정하기 용이하여, 인스턴스 세그멘테이션(Instance Segmentation) 작업 시 물체 테두리 점을 미세하게 직접 다듬고자 할 때 유리합니다.

Gemini (Boxes)

라벨 유형: Bounding Box (사각형 상자)

설명: Google의 다중모드 AI인 Gemini 3.7 Flash를 활용하여 이미지 속 물체를 감지하고 사각형 박스 형태로 라벨을 생성합니다.

용도: 일반적인 객체 탐지(Object Detection) 작업에서 사물 위치를 네모 박스로 빠르게 지정하고 자동 라벨링할 때 사용합니다.
### 새 프로젝트: recycling 생성 과정
- [구글계정으로 로그인](https://app.roboflow.com/login) >> new workspace >> name your workspace: recycling >> public plan >> "cyccling-items" >> Analytics
    - Project Type: Object Detection 선택
    - Target Object: recycling-items (프로젝트 이름 설정)
- Data
  Roboflow 메뉴는 AI(인공지능) 시각 모델을 만드는 공장 라인이라고 생각하면 이해하기 쉽습니다.

  각 메뉴는 사진 속 물체를 스스로 찾아내는 AI를 만드는 각 단계를 담당합니다.

  DATA (데이터 준비 단계)

    Upload Data: AI의 공부 자료 올리기 — 물체를 학습시킬 이미지나 영상 파일들을 시스템에 업로드하는 공간입니다.

    Annotate: 사진에 정답 표시하기 — 이미지 속 재활용품 위치에 네모 상자를 치고 "이건 플라스틱이야", "이건 캔이야"처럼 이름을 붙여주는 작업실입니다.

    Dataset: 공부 자료 정리함 — 라벨링을 마친 이미지들이 전체 몇 장인지, 잘 정리되어 있는지 한눈에 확인하는 폴더입니다.

    Versions: 교재 버전 만들기 — 이미지 크기를 맞추거나 색상을 바꾸는 등 AI가 공부하기 좋게 변형한 '최종 학습집(버전)'을 생성하는 곳입니다.

    Analytics: 데이터 통계 보기 — 내가 올린 사진들 속에 플라스틱이 몇 개나 있는지, 데이터 비율이 균형 있게 모였는지 그래프로 보여줍니다.

    Classes & Tags: 이름표 관리 — AI가 분류할 카테고리(플라스틱, 종이, 캔 등)의 목록을 확인하고 수정하는 곳입니다.

  MODELS (AI 학습 및 테스트 단계)

    Train: AI 학습 시작하기 — 준비한 데이터로 AI 모델에게 공부를 시키는 버튼입니다.

    Models: 내 AI 모델 목록 — 지금까지 학습을 끝낸 AI 모델들의 성적표와 목록을 확인하는 공간입니다.

    NAS (Neural Architecture Search): 최적의 AI 구조 찾기 — 상황에 맞는 가장 똑똑하고 효율적인 AI 신경망 구조를 자동으로 탐색합니다.

    Test: 실력 테스트 — 완성된 AI가 새로운 사진을 보고 재활용품을 잘 구분해내는지 미리 시험해보는 곳입니다.
  
      - Class Names: clothes, shoes, book, kitchenware, small_appliance, bag 입력 후 프로젝트 생성

  2. Universe에서 데이터셋 찾아 내 워크스페이스로 가져오기상단 메뉴 Universe 클릭검색창에 필요 클래스 키워드 검색 (예: clothes dataset, shoes detection 등)마음에 드는 데이터셋 프로젝트 카드를 클릭해 상세 페이지 진입우측 상단의 Download Dataset 또는 Clone / Import to Workspace 버튼 클릭팝업 창이 뜨면 "Import into Existing Project"를 선택하고, 1단계에서 만든 recycling-items 프로젝트를 지정가져올 이미지 수량을 확인하고 Import 클릭

  3. 클래스 이름 맞추기 (Remap Classes)가져온 데이터셋의 라벨명이 clothing이나 shoe 등 내 프로젝트 라벨명과 다를 수 있습니다.프로젝트 내 좌측 메뉴 Classes 또는 Dataset 진입Remap Classes 기능 선택외부 데이터의 클래스명을 내 프로젝트 표준명으로 매핑(예: shirt, pants $\rightarrow$ clothes / boot $\rightarrow$ shoes로 통합)

  4. 데이터셋 버전 생성 (Generate Dataset)좌측 메뉴 Generate 클릭Preprocessing(이미지 크기 리사이즈 등) 및 Augmentation(수량 증대 옵션) 설정Generate 버튼을 눌러 최종 학습용 버전을 완성합니다.

  5. 모델 학습 또는 바로 사용 (Train / Deploy)Train 버튼을 눌러 Roboflow 클라우드에서 바로 학습 진행 (5차시 대체 가능)학습 완료 후 Deploy 탭에서 API Key 및 Model ID를 확인하여 7차시 모바일 웹앱 코드에 그대로 연결합니다.
Vercel 환경변수:

```env
ROBOFLOW_API_KEY=발급받은_키
ROBOFLOW_MODEL_ID=recycling-items/1
```

브라우저용 `.env.local`:

```env
VITE_DEMO_MODE=false
```

**중요:** Roboflow API Key를 `VITE_...` 변수로 만들지 마세요. Vite의 `VITE_` 변수는 브라우저에 노출됩니다. 이 프로젝트는 `/api/detect.js` 서버리스 함수를 거쳐 Roboflow에 요청하도록 설계되어 있습니다.

## 3. Supabase 설정

1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행
3. Authentication > Providers에서 Google 활성화
4. Project URL과 Publishable key를 `.env.local` 또는 Vercel에 추가

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

5. Google OAuth Redirect URL에 Supabase에서 안내하는 callback URL 추가
6. Supabase Auth URL Configuration에서 로컬/배포 Site URL과 Redirect URL 설정

## 4. Vercel 배포

GitHub 저장소에 push 후 Vercel에서 Import합니다.

Environment Variables에 다음을 입력합니다.

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_DEMO_MODE=false
ROBOFLOW_API_KEY=...
ROBOFLOW_MODEL_ID=recycling-items/1
```

Build Command: `npm run build`
Output Directory: `dist`

## 5. 학생 수행평가 흐름

문제 조사 → 클래스 정의 → 사진 수집 → Bounding Box 라벨링 → 학습 → Test 이미지 평가 → 웹앱 연결 → 사람 검수 → SDGs 효과 분석

## 6. Human-in-the-loop

AI 검출 결과를 최종 정답으로 바로 저장하지 않습니다.
학생/직원이 +/− 버튼으로 개수를 수정한 다음 확정합니다.

이 구조를 통해:
- AI의 오류 가능성
- confidence
- 데이터 편향
- 인간 검수의 필요성
을 수업에서 다룰 수 있습니다.

## 7. 다음 확장
- 직원용 검수 Dashboard
- 기부자의 누적 기부 통계
- QR 기부 확인 페이지
- 사진 Supabase Storage 저장
- 기부 가능/불가 여부 별도 모델
- 품목별 재사용 효과 통계
- 학교별 SDGs 실천 대시보드

# 제미나이 Q n A

SDGs 12.5 목표 달성을 위한 기부물품 분류 프로젝트의 4차시(라벨링) 및 모델 활용 단계에 대한 답변입니다.

1. Roboflow에서 가장 쉽고 직관적이며 빠른 라벨링 방법

Roboflow 툴에서 일일이 드래그하여 상자를 그리는 대신, AI 자동 라벨링 기능을 활용하면 작업 시간을 90% 이상 단축할 수 있습니다.

Smart Polygon / Smart Labeling (추천):
Roboflow Annotate 화면 우측/좌측 도구함에서 마술봉 모양 아이콘(Smart Labeling)을 선택합니다. 물체 위를 클릭 한 번만 하거나 대략적인 영역을 지정하면 AI가 물체의 경계선을 자동으로 인식해 Bounding Box(또는 Polygon)를 형성합니다.

Auto-Labeling (Label Assist):
상단 메뉴의 Auto-Label 기능(Roboflow Universe 모델 기반)을 활성화하면, 기존에 학습된 AI 모델이 1차적으로 물체를 찾아 Bounding Box와 클래스를 자동으로 제안합니다. 학생들은 잘못된 부분만 수정하거나 클래스 이름만 확인(Review)하면 됩니다.

Labeling-Assist Shortcut Keys (단축키 활용):
키보드 단축키 W(Bounding Box 생성), Enter(저장 후 다음 이미지 이동) 등을 활용하도록 지도하면 연속 작업 속도가 극대화됩니다.