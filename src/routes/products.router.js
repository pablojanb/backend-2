import { Router } from "express"
import ProductsController from "../controllers/products.controller.js"

const router = Router()

router.post('/', ProductsController.addProduct)
router.put('/:pid', ProductsController.updateProduct)
router.delete('/:pid', ProductsController.deleteProduct)

export default router