import usersModel from "../models/users.model.js"

export default class UsersDao {
    static async getUser(uid) {
        try {
            const user = await usersModel.findOne({_id:uid})
            return user
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get user'}
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await usersModel.findOne({email})
            return user
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get user'}
        }
    }

    static async getUserByGoogleId(gid) {
        try {
            const user = await usersModel.findOne({id_google:gid})
            return user
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get user'}
        }
    }

    static async getUserByGithubId(gid) {
        try {
            const user = await usersModel.findOne({id_github:gid})
            return user
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get user'}
        }
    }

    static async createUser(newUser) {
        try {
            const user = await usersModel.create(newUser)
            return user
        } catch (error) {
            console.log(error)
            return {error: 'Cannot save user'}
        }
    }

    static async updateUserParameter(email, newUser) {
        try {
            const user = await usersModel.updateOne({email}, {$set: newUser})
            return user
        } catch (error) {
            console.log(error)
            return {error: 'Cannot update user'}
        }
    }
}