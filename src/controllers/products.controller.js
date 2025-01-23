import ProductsService from "../repository/products.service.js"

export default class ProductsController {

    static async addProduct(req, res) {
        try {
            const product = req.body
            const newProduct = await ProductsService.addProduct(product)
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
            const updatedProduct = await ProductsService.updateProduct(pid, product)
            if (updatedProduct) res.sendSuccess(updatedProduct)
            if (!updatedProduct) res.sendBadRequest('Invalid parameters')
       } catch (error) {
            res.sendServerError(error)
       }
    }

    static async deleteProduct(req, res) {
        try {
            const { pid } = req.params
            const productDeleted = await ProductsService.deleteProduct(pid)
            res.sendSuccess(productDeleted)
        } catch (error) {
            res.sendServerError(error)
        }
    }
}