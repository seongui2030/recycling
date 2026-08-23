import { useMemo, useState } from 'react'
import { hasSupabase, supabase } from './supabase'

const LABELS = {
  clothes: '의류',
  shoes: '신발',
  book: '도서',
  kitchenware: '주방용품',
  small_appliance: '소형가전',
  bag: '가방',
}

function dataUrlFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function demoPredictions() {
  return {
    image: { width: 1000, height: 750 },
    predictions: [
      { class: 'book', confidence: 0.94, x: 250, y: 250, width: 260, height: 220 },
      { class: 'book', confidence: 0.90, x: 470, y: 270, width: 250, height: 210 },
      { class: 'clothes', confidence: 0.91, x: 710, y: 330, width: 330, height: 300 },
      { class: 'shoes', confidence: 0.88, x: 290, y: 570, width: 260, height: 170 },
    ],
  }
}

function groupPredictions(predictions) {
  const result = {}
  for (const p of predictions) {
    const key = p.class
    result[key] = (result[key] || 0) + 1
  }
  return result
}

export default function App() {
  const [imageUrl, setImageUrl] = useState('')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(false)

  const counts = useMemo(
    () => groupPredictions(result?.predictions || []),
    [result],
  )

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  async function signIn() {
    if (!hasSupabase) {
      setMessage('Supabase 환경변수가 없어 현재는 로그인 없이 데모 모드로 실행됩니다.')
      return
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  async function onPhoto(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setBusy(true)
    setMessage('')
    setSaved(false)
    const dataUrl = await dataUrlFromFile(file)
    setImageUrl(dataUrl)

    try {
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        setResult(demoPredictions())
        setMessage('수업용 DEMO MODE입니다. 실제 Roboflow 연결 시 VITE_DEMO_MODE=false로 변경하세요.')
      } else {
        const res = await fetch('/api/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || '검출 API 오류')
        setResult(json)
      }
    } catch (err) {
      setMessage(err.message)
      setResult(null)
    } finally {
      setBusy(false)
    }
  }

  async function saveDonation() {
    if (!result || total === 0) return

    if (!hasSupabase) {
      setSaved(true)
      setMessage('Supabase 미연결 상태라 화면에서만 저장 완료를 시뮬레이션했습니다.')
      return
    }

    const { data: auth } = await supabase.auth.getUser()
    const user = auth?.user
    if (!user) {
      setMessage('기부 내역 저장 전에 Google 로그인을 해주세요.')
      return
    }

    const { data: donation, error: donationError } = await supabase
      .from('donations')
      .insert({
        user_id: user.id,
        total_count: total,
        status: 'confirmed',
      })
      .select()
      .single()

    if (donationError) {
      setMessage(donationError.message)
      return
    }

    const rows = Object.entries(counts).map(([category, quantity]) => {
      const candidates = result.predictions.filter(p => p.class === category)
      const confidence = candidates.length
        ? candidates.reduce((s, p) => s + Number(p.confidence || 0), 0) / candidates.length
        : null

      return {
        donation_id: donation.id,
        category,
        quantity,
        confidence,
      }
    })

    const { error: itemError } = await supabase.from('donation_items').insert(rows)
    if (itemError) {
      setMessage(itemError.message)
      return
    }

    setSaved(true)
    setMessage('기부 내역이 Supabase에 저장되었습니다.')
  }

  function adjustCount(category, delta) {
    if (!result) return
    const current = result.predictions || []

    if (delta > 0) {
      setResult({
        ...result,
        predictions: [
          ...current,
          { class: category, confidence: 1, x: 0, y: 0, width: 0, height: 0, manual: true },
        ],
      })
    } else {
      const index = current.findLastIndex(p => p.class === category)
      if (index < 0) return
      const copy = [...current]
      copy.splice(index, 1)
      setResult({ ...result, predictions: copy })
    }
  }

  return (
    <main className="app">
      <header className="hero">
        <div>
          <span className="eyebrow">SDGs 12 · 자원순환 AI</span>
          <h1>recycling</h1>
          <p>기부물품을 촬영하면 AI가 품목을 찾고 개수를 자동 집계합니다.</p>
        </div>
        <button className="ghost" onClick={signIn}>Google 로그인</button>
      </header>

      <section className="card">
        <h2>1. 기부물품 촬영</h2>
        <p className="muted">탁자 위에 물품이 서로 너무 겹치지 않게 펼쳐 놓고 촬영하세요.</p>
        <label className="cameraButton">
          📷 사진 촬영 / 선택
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onPhoto}
          />
        </label>
      </section>

      {busy && <section className="card center">AI가 물품을 분석하고 있습니다…</section>}

      {imageUrl && (
        <section className="card">
          <h2>2. AI 검출 화면</h2>
          <div className="imageWrap">
            <img src={imageUrl} alt="기부물품" />
            {result?.image?.width && result.predictions
              ?.filter(p => !p.manual && p.width > 0 && p.height > 0)
              .map((p, i) => {
                const iw = result.image.width
                const ih = result.image.height
                const left = ((p.x - p.width / 2) / iw) * 100
                const top = ((p.y - p.height / 2) / ih) * 100
                const width = (p.width / iw) * 100
                const height = (p.height / ih) * 100
                return (
                  <div
                    className="box"
                    key={`${p.class}-${i}`}
                    style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
                  >
                    <span>{LABELS[p.class] || p.class} {Math.round(p.confidence * 100)}%</span>
                  </div>
                )
              })}
          </div>
        </section>
      )}

      {result && (
        <section className="card">
          <h2>3. 품목 확인 및 수정</h2>
          <div className="summary">
            {Object.keys(LABELS).map(category => {
              const quantity = counts[category] || 0
              return (
                <div className="row" key={category}>
                  <div>
                    <strong>{LABELS[category]}</strong>
                    <span>{category}</span>
                  </div>
                  <div className="stepper">
                    <button onClick={() => adjustCount(category, -1)} disabled={quantity === 0}>−</button>
                    <b>{quantity}</b>
                    <button onClick={() => adjustCount(category, 1)}>＋</button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="total">
            <span>전체 기부물품</span>
            <strong>{total}개</strong>
          </div>

          <button className="primary" disabled={total === 0 || saved} onClick={saveDonation}>
            {saved ? '기부 등록 완료' : '확인 후 기부 등록'}
          </button>
        </section>
      )}

      {message && <div className="notice">{message}</div>}

      <section className="sdg">
        <b>SDG 12.5</b>
        <span>재사용·재활용을 통해 폐기물 발생을 줄이는 실천 프로젝트</span>
      </section>
    </main>
  )
}
