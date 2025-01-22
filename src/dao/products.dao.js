import productsModel from "../models/products.model.js"

export default class ProductsDao {

    static async saveProduct(product) {
        try {
            const newProduct = await productsModel.create(product)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    static async getProduct(pid) {
        try {
            const product = await productsModel.findOne({_id:pid})
            return product
        } catch (error) {
            console.log(error)
        }
    }

    static async updateProduct(pid, product) {
        try {
            const newProduct = await productsModel.updateOne({_id:pid}, product)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteProduct(pid) {
        try {
            const product = await productsModel.deleteOne({_id:pid})
            return product
        } catch (error) {
            console.log(error)
        }
    }
}