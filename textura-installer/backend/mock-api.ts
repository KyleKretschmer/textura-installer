import express from 'express'
import { helloHandler, statusHandler } from './handlers/hello.handler.js'
import { detectDotNetHandler, runDotNetHandler } from './handlers/dotnet.handler.js'

const app = express()
app.use(express.json())

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  next()
})

app.options('*', (_req, res) => res.sendStatus(204))

app.post('/api/hello', (req, res) => {
  try {
    const result = helloHandler(req.body)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Bad request' })
  }
})

app.get('/api/status', (_req, res) => {
  res.json(statusHandler())
})
app.get('/api/dotnet/detect', (_req, res) => {
  res.json(detectDotNetHandler())
})

app.post('/api/dotnet/run', (req, res) => {
  try {
    const result = runDotNetHandler(req.body)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Bad request' })
  }
})
const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`)
})