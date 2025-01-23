import CartsService from "../repositories/carts.service.js"

export default class CartsController {

    static async createCart(req, res) {
        try {
            const { uid } = req.params
            const newCart = await CartsService.createCart(uid)
            res.sendSuccess(newCart)
        } catch (error) {
            res.sendServerError(error)
        }
    }
    
    static async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params
            const result = await CartsService.addProductToCart(cid, pid)
            res.sendSuccess(result)
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static async purchaseCart(req, res) {
        try {
            const { cid } = req.params
            const purchase = await CartsService.purchaseCart(cid)
            res.sendSuccess(purchase)
        } catch (error) {
            res.sendServerError(error)
        }
    }
}