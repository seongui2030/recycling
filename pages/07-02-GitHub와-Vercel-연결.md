# 07-02. GitHub와 Vercel 연결

> **코드를 올리면 웹앱이 따라 올라갑니다**

### Dashboard 방식

1. Vercel에 로그인합니다.
2. Add New Project를 선택합니다.
3. GitHub 저장소를 선택합니다.
4. `seongui2030/recycling`과 같은 저장소를 Import합니다.
5. Framework Preset에서 Vite가 인식되는지 확인합니다.
6. 배포합니다.

Vercel은 GitHub와 연결된 저장소에서 commit이나 pull request를 기준으로 자동 배포할 수 있습니다. citeturn1search3

### CLI를 사용한다면

공식 문서에는 다음과 같은 흐름도 있습니다.

```bash
vercel
```

또는:

```bash
vercel --prod
```

Vercel CLI 문서에서도 프로젝트 루트에서 `vercel` 명령으로 배포할 수 있음을 안내합니다. citeturn1search1turn1search4

수업에서는 학생이 Vercel Dashboard를 사용하는 방식이 화면 확인에 더 편리할 수 있습니다.
