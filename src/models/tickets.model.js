import mongoose from "mongoose"

const ticketsSchema = new mongoose.Schema({
    purchase_datetime: {
        type: Date,
        default: new Date(),
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

export default mongoose.model('tickets', ticketsSchema)