import usersModel from "../models/users.model.js"

export default class UsersDao {
    static async getUser(uid) {
        try {
            const user = await usersModel.findOne({_id:uid})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}