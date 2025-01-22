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

const app = express()
app.use(cors())
app.use(express.json())
//app.use(express.urlencoded({extended:true}))

initializePassport()
app.use(passport.initialize())

app.use(cookieParser())

app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

app.listen(config.port, ()=> {
    console.log(`Listening on port ${config.port}`)
})

ConnectioDB.getInstance()