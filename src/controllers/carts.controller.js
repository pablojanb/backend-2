import { cartsService } from "../repositories/index.js"

export default class CartsController {

    static async createCart(req, res) {
        try {
            const { uid } = req.params
            const newCart = await cartsService.createCart(uid)
            res.sendSuccess(newCart)
        } catch (error) {
            res.sendServerError(error)
        }
    }
    
    static async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params
            const result = await cartsService.addProductToCart(cid, pid)
            if (!result) res.sendBadRequest("Cart or product doesn't exist")
            if (result) res.sendSuccess(result)
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static async purchaseCart(req, res) {
        try {
            const { cid } = req.params
            const purchase = await cartsService.purchaseCart(cid)
            if (purchase===null) return res.sendServerError('Cannot purchase cart right now')
            res.sendSuccess(purchase)
        } catch (error) {
            res.sendServerError(error)
        }
    }
}