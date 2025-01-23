import mongoose from "mongoose"

const resetPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

resetPasswordSchema.index({createdAt: 1}, {expireAfterSeconds: 900})

export default mongoose.model('resetPasswords', resetPasswordSchema)