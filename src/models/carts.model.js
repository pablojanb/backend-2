import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
        userId: String,
        products: []
})

export default mongoose.model('carts', cartsSchema)