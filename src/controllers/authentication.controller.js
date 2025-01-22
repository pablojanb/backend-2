import { generateToken } from '../utils/generateToken.js'
import UsersDto from '../dto/users.dto.js'

export default class AuthenticationController {
    static register(req, res) {
        try {
            if (req.user) {
                const newUser = req.user
                const token = generateToken(newUser)
                res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 60*60*24}).send({status: 'user registered & logged in', payload: newUser})
            }
        } catch (error) {
            console.log(error)
        }
    }

    static login(req, res){
        try {
            if (req.user) {
                const user = req.user
                const token = generateToken(user)
                res.cookie('userlogged', token, {httpOnly: true, secure: false, maxAge: 60*60*24}).send({status: 'correct login', payload: user})
            }
        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res){
        try {
            res.clearCookie('userlogged').send({status: 'correct logged out'})
        } catch (error) {
            console.log(error)
        }
    }

    static current(req, res){
        try {
            if (req.user) {
                const user = new UsersDto(req.user)
                res.send({status: 'succes', payload: user})
            }
        } catch (error) {
            console.log(error)
        }
    }

    static admin(req, res) {
        try {
            if (req.user) {
                const {first_name, last_name, age } = req.user
                const data = { first_name, last_name, age }
                res.send({status: 'succes', payload: data})
            }
        } catch (error) {
            console.log(error)
        }
    }
}