export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 지원합니다.' })
  }

  const apiKey = process.env.ROBOFLOW_API_KEY
  const modelId = process.env.ROBOFLOW_MODEL_ID

  if (!apiKey || !modelId) {
    return res.status(500).json({
      error: 'ROBOFLOW_API_KEY 또는 ROBOFLOW_MODEL_ID가 설정되지 않았습니다.'
    })
  }

  try {
    const image = req.body?.image
    if (!image) return res.status(400).json({ error: 'image 값이 없습니다.' })

    const base64 = image.includes(',') ? image.split(',')[1] : image

    const [projectId, version] = modelId.split('/')
    if (!projectId || !version) {
      return res.status(500).json({
        error: 'ROBOFLOW_MODEL_ID는 project-slug/version 형식이어야 합니다. 예: recycling-items/1'
      })
    }

    const url = `https://detect.roboflow.com/${encodeURIComponent(projectId)}/${encodeURIComponent(version)}?api_key=${encodeURIComponent(apiKey)}&confidence=35&overlap=30`

    const rf = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: base64,
    })

    const data = await rf.json()
    if (!rf.ok) {
      return res.status(rf.status).json({
        error: data?.message || data?.error || 'Roboflow inference failed'
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unknown server error' })
  }
}
