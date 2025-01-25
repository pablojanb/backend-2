import { generateToken } from '../utils/generateToken.js'
import UsersDto from '../dto/users.dto.js'
import { resetPasswordService } from '../repositories/index.js'
import { transport } from '../config/nodemailer.js'
import { config } from '../config/config.js'

export default class AuthenticationController {
    static register(req, res) {
        try {
            if (!req.user) return res.sendBadRequest({msg:'Failed registration'})
            const newUser = req.user
            const token = generateToken(newUser)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 3600000}).send(newUser)
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static login(req, res){
        try {
            if (!req.user) return res.sendBadRequest({msg:'Failed login'})
            const user = req.user
            const token = generateToken(user)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 3600000}).send({msg:'Login correct'})
        } catch (error) {
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

    static async resetPassword(req, res){
        try {
            const { email } = req.body
            if (!email) return res.sendBadRequest({msg:'Missing parameters'})
            const token = await resetPasswordService.saveToken(email)
            
            await transport.sendMail({
                from: `${config.email_nodemailer}`,
                to: `${email}`,
                subject: 'Reset password',
                html: `
                <h2>Link to reset password</h2>
                `
            })

            res.sendSuccess(token)
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static async reset(req, res){
        try {
            const { email, token } = req.query
            const { password } = req.body
            if (!email || !token || !password) return res.sendBadRequest({msg:'Missing parameters'})
            const user = {
                email,
                token,
                password
            }
            const result = await resetPasswordService.updatePasword(user)
            if(!result) return res.sendBadRequest({msg:'Invalid token'})
            if(result) res.sendSuccess(result)
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static loginGoogle(req, res){
        try {
            if (!req.user) return res.sendBadRequest({msg:'Failed login with google'})
            const user = req.user
            const token = generateToken(user)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 3600000}).send({msg:'Login correct'})
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static loginGithub(req, res){
        try {
            if (!req.user) return res.sendBadRequest({msg:'Failed login with github'})
            const user = req.user
            const token = generateToken(user)
            res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 3600000}).send({msg:'Login correct'})
        } catch (error) {
            res.sendServerError(error)
        }
    }
}