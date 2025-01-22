import express from 'express'
import dotenv from 'dotenv'
import sessionsRouter from './routes/sessions.router.js'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT
app.use(express.json())

initializePassport()
app.use(passport.initialize())

app.use(cookieParser())

app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})

mongoose.connect(process.env.MONGO)