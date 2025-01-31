import resetPasswordsModel from "../models/resetPasswords.model.js"

export default class ResetPasswordsDao {

    static async saveToken(user) {
        try {
            const alreadyExists = await resetPasswordsModel.findOne({email: user.email})
            if (alreadyExists) return resetPasswordsModel.updateOne(user)
            const newToken = await resetPasswordsModel.create(user)
            return newToken
        } catch (error) {
            console.log(error)
            return {error: 'Cannot save token'}
        }
    }

    static async getToken(email) {
        try {
            const user = await resetPasswordsModel.findOne({email})
            if (!user) return null
            return user.token
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get token'}
        }
    }

   
}