import resetPasswordsModel from "../models/resetPasswords.model.js"

export default class ResetPasswordsDao {

    static async saveToken(user) {
        try {
            const newToken = await resetPasswordsModel.create(user)
            return newToken
        } catch (error) {
            console.log(error)
            return {error: 'Cannot save token'}
        }
    }

    static async getToken(email) {
        try {
            const token = await resetPasswordsModel.findOne({email})
            return token
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get token'}
        }
    }

   
}