export default class UsersService{
    
    constructor(dao){
        this.dao = dao
    }

    async getUser(uid) {
        try {
            const user = await this.dao.getUser(uid)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.dao.getUserByEmail(email)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByGoogleId(gid) {
        try {
            const user = await this.dao.getUserByGoogleId(gid)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByGithubId(gid) {
        try {
            const user = await this.dao.getUserByGithubId(gid)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(newUser) {
        try {
            const user = await this.dao.createUser(newUser)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async updateUserParameter(email, newUser) {
        try {
            const user = await this.dao.updateUserParameter(email, newUser)
            return user
        } catch (error) {
            console.log(error)
        }
    }
}