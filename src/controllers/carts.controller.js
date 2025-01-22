import CartsService from "../repository/carts.service.js"

export default class CartsController {

    static async createCart(req, res) {
        try {
            const { uid } = req.params
            const newCart = await CartsService.createCart(uid)
            res.send(newCart)
        } catch (error) {
            console.log(error)
        }
    }
    
    static async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params
            const result = await CartsService.addProductToCart(cid, pid)
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static async purchaseCart(req, res) {
        try {
            const { cid } = req.params
            const purchase = await CartsService.purchaseCart(cid)
            res.send(purchase)
        } catch (error) {
            console.log(error)
        }
    }
}