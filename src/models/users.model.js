import mongoose from "mongoose"

const collectionName = 'users'

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    cart: String,
    roles: {
        type: [String],
        default: ['user']
    },
    id_google: String,
    id_github: Number
})

export default mongoose.model(collectionName, usersSchema)