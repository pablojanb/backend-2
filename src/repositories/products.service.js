export default class ProductsService{

    constructor(dao){
        this.dao = dao
    }

    async addProduct(product) {
        try {
            const { title, price, stock } = product
            if (title === "" || isNaN(price) || isNaN(stock)) {
                return null
            }
            const newProduct = await this.dao.saveProduct(product)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async getProduct(pid) {
        try {
            const product = this.dao.getProduct(pid)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, product) {
        try {
            const { title, price, stock } = product
            if (title === "" || isNaN(price) || isNaN(stock)) {
                return null
            }
            const productUpdated = await this.dao.updateProduct(pid, product)
            return productUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid) {
        try {
            const productDeleted = await this.dao.deleteProduct(pid)
            return productDeleted
        } catch (error) {
            console.log(error)
        }
    }
}