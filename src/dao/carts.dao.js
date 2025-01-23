import cartsModel from "../models/carts.model.js"

export default class CartsDao {
    static async createCart(cart) {
        try {
            const newCart = await cartsModel.create(cart)
            return newCart
        } catch (error) {
            console.log(error)
            return {error: 'Cannot create cart'}
        }
    }
    
    static async getCart(cid) {
        try {
            const cart = await cartsModel.findOne({_id:cid})
            return cart
        } catch (error) {
            console.log(error)
            return {error: 'Cannot get cart'}
        }
    }

    static async updateCart(cid, cart) {
        try {
            const updatedCart = await cartsModel.updateOne({_id:cid}, cart)
            return updatedCart
        } catch (error) {
            console.log(error)
            return {error: 'Cannot update cart'}
        }
    }
}