import ProductsDao from "../dao/products.dao.js"

export default class ProductsService{
    static async addProduct(product) {
        try {
            const { title, price, stock } = product
            //TODO validaciones de product
            const newProduct = await ProductsDao.saveProduct(product)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    static async getProduct(pid) {
        try {
            const product = ProductsDao.getProduct(pid)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    static async updateProduct(pid, product) {
        try {
            const productUpdated = await ProductsDao.updateProduct(pid, product)
            return productUpdated
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteProduct(pid) {
        try {
            const productDeleted = await ProductsDao.deleteProduct(pid)
            return productDeleted
        } catch (error) {
            console.log(error)
        }
    }
}