import { v4 as uuidv4 } from 'uuid'
import { hashPass } from "../utils/password.js"
import { usersService } from './index.js'

export default class ResetPasswordsService{

    constructor(dao){
        this.dao = dao
    }

    async saveToken(email) {
        try {
            const token = uuidv4()
            const user = {
                email,
                token
            }
            const newToken = await this.dao.saveToken(user)
            return newToken
        } catch (error) {
            console.log(error)
        }
    }

    async updatePasword(user) {
        try {
            const tokenDB = await this.dao.getToken(user.email)

            if (!tokenDB || tokenDB.token !== user.token) return null
            const updatedUser = {
                password: hashPass(user.password)
            }
            const result = await usersService.updateUserParameter(user.email, updatedUser)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}