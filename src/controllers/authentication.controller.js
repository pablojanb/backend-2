import { generateToken } from '../utils/generateToken.js'
import UsersDto from '../dto/users.dto.js'

export default class AuthenticationController {
    static register(req, res) {
        try {
            if (!req.user) return res.sendBadRequest({msg:'Failed registration'})
            const newUser = req.user
            const token = generateToken(newUser)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 60*60*24}).send(newUser)
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static login(req, res){
        try {
            if (!req.user) return res.sendBadRequest({msg:'Failed login'})
            const user = req.user
            const token = generateToken(user)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 60*60*24}).send({msg:'Login correct'})
        } catch (error) {
            console.log(error)
            res.sendServerError(error)
        }
    }

    static logout(_, res){
        try {
            res.clearCookie('userlogged').send({msg:'Logout correct'})
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static current(req, res){
        try {
            if (!req.user) return res.sendUnauthorized('Invalid credentials')
            const user = new UsersDto(req.user)
            res.sendSuccess(user)
        } catch (error) {
            res.sendServerError(error)
        }
    }
}