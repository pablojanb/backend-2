import express from 'express'
import { config } from './config/config.js'
import sessionsRouter from './routes/sessions.router.js'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import ConnectioDB from './config/connectionDB.js'
import cors from 'cors'
import { customResposes } from './utils/customResponses.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}))

app.use(customResposes)
initializePassport()
app.use(passport.initialize())

app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

app.use((err, _, res, __) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!'})
})

ConnectioDB.getInstance()

app.listen(config.port, ()=> {
    console.log(`Listening on port ${config.port}`)
})