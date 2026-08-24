# 05-04. Node.js와 npm

> **브라우저 밖에서도 JavaScript를 실행하기**

React 프로젝트를 개발하려면 Node.js 환경이 필요합니다.

Node.js를 설치하면 보통 npm도 함께 사용할 수 있습니다.

확인:

```bash
node --version
npm --version
```

### package.json

프로젝트의 `package.json`은 어떤 패키지를 사용하고 어떤 명령을 실행하는지 알려 줍니다.

예를 들어:

```bash
npm run dev
```

는 package.json의 scripts에 등록된 `dev` 명령을 실행합니다.

### npm install

프로젝트 폴더에서:

```bash
npm install
```

을 실행하면 package.json을 기준으로 필요한 라이브러리를 설치합니다.

학생이 기억할 문장은 이것입니다.

> **Node.js는 실행 환경, npm은 패키지를 관리하는 도구입니다.**

이 정도면 첫 프로젝트를 시작하기에 충분합니다.
