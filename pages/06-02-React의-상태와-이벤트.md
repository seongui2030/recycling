# 06-02. React의 상태와 이벤트

> **변하는 값을 state로 기억합니다**

우리 프로젝트에서는 다음과 같은 상태를 사용합니다.

```javascript
const [user, setUser] = useState(null)
const [imageUrl, setImageUrl] = useState('')
const [result, setResult] = useState(null)
const [busy, setBusy] = useState(false)
const [message, setMessage] = useState('')
const [saved, setSaved] = useState(false)
```

`useState`의 기본 형태는:

```javascript
const [값, 값을바꾸는함수] = useState(초기값)
```

예:

```javascript
const [count, setCount] = useState(0)
setCount(count + 1)
```

### 이벤트

버튼 클릭:

```jsx
<button onClick={signIn}>Google 로그인</button>
```

파일 선택:

```jsx
<input type="file" onChange={onPhoto} />
```

즉, React 앱은 사용자의 행동을 이벤트로 받고 상태를 바꾸어 화면을 다시 그립니다.

`App.jsx`의 로그인, 사진 선택, 저장 함수도 모두 이 구조를 따릅니다. fileciteturn6file0
