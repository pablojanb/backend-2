import ProductsService from "../repository/products.service.js"

export default class ProductsController {

    static async addProduct(req, res) {
        try {
            const product = req.body
            const newProduct = await ProductsService.addProduct(product)
            res.send(newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    static async updateProduct(req, res) {
       try {
         const { pid } = req.params
         const product = req.body
         const updatedProduct = await ProductsService.updateProduct(pid, product)
         res.send(updatedProduct)
       } catch (error) {
        console.log(error)
       }
    }

    static async deleteProduct(req, res) {
        try {
            const { pid } = req.params
            const productDeleted = await ProductsService.deleteProduct(pid)
            res.send(productDeleted)
        } catch (error) {
            console.log(error)
        }
    }
}