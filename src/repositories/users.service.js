import UsersDao from "../dao/users.dao.js"

export default class UsersService{
    
    static async getUser(uid) {
        try {
            const user = await UsersDao.getUser(uid)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await UsersDao.getUserByEmail(email)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    static async createUser(newUser) {
        try {
            const user = await UsersDao.createUser(newUser)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    static async updateUserParameter(email, newUser) {
        try {
            const user = await UsersDao.updateUserParameter(email, newUser)
            return user
        } catch (error) {
            console.log(error)
        }
    }
}