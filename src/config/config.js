import dotenv from 'dotenv'
import options from './commander.js'

dotenv.config({
    path: options.mode === 'dev' ? './.env' : './.env.production'
})

export const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO,
    jwtSecret: process.env.JWT_SECRET
}