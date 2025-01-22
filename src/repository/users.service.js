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
}