import ResetPasswordsDao from "../dao/resetPasswords.dao.js"
import { v4 as uuidv4 } from 'uuid'
import { hashPass } from "../utils/password.js"
import UsersService from "./users.service.js"

export default class ResetPasswordsService{
    static async saveToken(email) {
        try {
            const token = uuidv4()
            const user = {
                email,
                token
            }
            const newToken = await ResetPasswordsDao.saveToken(user)
            return newToken
        } catch (error) {
            console.log(error)
        }
    }

    static async updatePasword(user) {
        try {
            const tokenDB = await ResetPasswordsDao.getToken(user.email)

            if (!tokenDB || tokenDB.token !== user.token) return null
            const updatedUser = {
                password: hashPass(user.password)
            }
            console.log()
            const result = await UsersService.updateUserParameter(user.email, updatedUser)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}