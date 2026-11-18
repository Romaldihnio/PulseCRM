import "dotenv/config"
import express from 'express'
import cors from  "cors"
import { dealRoutes } from "./routes/deal.routes.js"
import { clientRoutes } from "./routes/client.route.js"
const app = express()
app.use(cors())
app.use(express.json())
app.get("/health", (req, res) => {
    res.json    ({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})
app.use("/api/deals", dealRoutes)
app.use("/api/client", clientRoutes)
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT,() => {
    console.log(`CRM API запущена : http://localhost:${PORT}`)
})