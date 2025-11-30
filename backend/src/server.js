import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import auditRoutes from './routes/auditRoutes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const frontendURL = process.env.CLIENT_URL

app.use(express.json())

app.use(
  cors({
    origin: frontendURL,
    allowedHeaders: ['content-type'],
    methods: ['POST', 'GET'],
  })
)

app.use('/', auditRoutes)

app.get('/', async (req, res) => {
  res.status(200).json({ status: 'Server is Active and Running' })
})

app.listen(PORT, () => {
  console.log('server running at http://localhost:5000')
})
