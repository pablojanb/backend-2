import { Router } from "express"
import { genereteToken } from "../utils/generateToken.js"
import { passportCall } from "../utils/passportCall.js"

const router = Router()

router.post('/register', passportCall('register') ,async(req, res)=>{
    try {
        if (req.user) {
            const newUser = req.user
            const token = genereteToken(newUser)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 60*60*24}).send({status: 'user registered & logged in', payload: newUser})
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/login', passportCall('login'), async(req, res)=>{
    try {
        if (req.user) {
            const user = req.user
            const token = genereteToken(user)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 60*60*24}).send({status: 'correct login', payload: user})
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', (req, res)=>{
    try {
        res.clearCookie('userlogged').send({status: 'correct logged out'})
    } catch (error) {
        console.log(error)
    }
})

router.get('/current', passportCall('jwt') ,(req, res)=>{
    try {
        if (req.user) {
            const {first_name, last_name, age } = req.user
            const data = { first_name, last_name, age }
            res.send({status: 'succes', payload: data})
        }
    } catch (error) {
        console.log(error)
    }
})

export default router