import { productService } from '../repositories/products/index.js'

export default class ProductsController {

    static async addProduct(req, res) {
        try {
            const product = req.body
            const newProduct = await productService.addProduct(product)
            if (newProduct) res.sendSuccess(newProduct)
            if (!newProduct) res.sendBadRequest('Invalid parameters')
        } catch (error) {
            res.sendServerError(error)
        }
    }

    static async updateProduct(req, res) {
       try {
            const { pid } = req.params
            const product = req.body
            const updatedProduct = await productService.updateProduct(pid, product)
            if (updatedProduct.modifiedCount === 0) return res.sendBadRequest("Product doesn't exist")
            if (updatedProduct) res.sendSuccess(updatedProduct)
            if (!updatedProduct) res.sendBadRequest('Invalid parameters')
       } catch (error) {
            res.sendServerError(error)
       }
    }

    static async deleteProduct(req, res) {
        try {
            const { pid } = req.params
            const productDeleted = await productService.deleteProduct(pid)
            if (productDeleted.deletedCount === 0) return res.sendBadRequest("Product doesn't exist")
            res.sendSuccess(productDeleted)
        } catch (error) {
            res.sendServerError(error)
        }
    }
}