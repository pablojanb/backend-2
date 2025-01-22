import { Router } from "express"
import CartsController from "../controllers/carts.controller.js"

const router = Router()

router.post('/:uid', CartsController.createCart)
router.put('/:cid/add/:pid', CartsController.addProductToCart)
router.post('/:cid/purchase', CartsController.purchaseCart)

export default router