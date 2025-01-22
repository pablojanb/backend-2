import { Router } from "express"
import ProductsController from "../controllers/products.controller.js"
import { passportCall } from "../utils/passportCall.js"
import { auth } from "../middlewares/authorization.js"

const router = Router()

router.use(passportCall('jwt'))
router.use(auth('admin'))

router.post('/', ProductsController.addProduct)
router.put('/:pid', ProductsController.updateProduct)
router.delete('/:pid', ProductsController.deleteProduct)

export default router