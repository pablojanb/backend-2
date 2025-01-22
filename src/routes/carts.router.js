import { Router } from "express"
import CartsController from "../controllers/carts.controller.js"
import { passportCall } from "../utils/passportCall.js"
import { auth } from "../middlewares/authorization.js"

const router = Router()

router.use(passportCall('jwt'))
router.use(auth('user'))

router.post('/:uid', CartsController.createCart)
router.post('/:cid/add/:pid', CartsController.addProductToCart)
router.get('/:cid/purchase', CartsController.purchaseCart)

export default router