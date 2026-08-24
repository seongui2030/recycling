# 07-04. Build와 배포 확인

> **배포가 성공했는지 확인하는 체크포인트**

Vite 프로젝트의 대표적인 build 명령은:

```bash
npm run build
```

입니다.

저장소 README에서도 Build Command를 `npm run build`, Output Directory를 `dist`로 안내합니다. fileciteturn9file0

### 배포 후 확인 순서

1. Vercel Deployment가 Ready인지 확인합니다.
2. 배포 URL을 엽니다.
3. 사진 선택이 되는지 확인합니다.
4. DEMO MODE라면 예측 결과가 나오는지 확인합니다.
5. 실제 Roboflow라면 `/api/detect`가 정상 응답하는지 확인합니다.
6. Google 로그인합니다.
7. 기부 등록을 합니다.
8. Supabase Table Editor에서 기록을 확인합니다.

### Vercel 로그

문제가 생기면 Deployment의 Functions/Logs를 확인합니다.

Vercel은 배포 상세 화면에서 빌드 정보와 로그, 함수 정보를 확인할 수 있도록 제공합니다. citeturn1search3

학생에게 중요한 것은 “배포 버튼을 눌렀다”가 아니라 **실제 스마트폰에서 기능을 끝까지 확인했다**는 것입니다.
