import ProductsService from "./products.service.js"
import ProductsDao from '../../dao/products.dao.js'

export const productService = new ProductsService(ProductsDao)