import CartsDao from "../dao/carts.dao.js"
import ProductsService from "./products.service.js"
import TicketsService from "./tickets.service.js"

export default class CartsService{
    
    static async createCart(uid) {
        try {
            const cart = {
                userId: uid,
                products: []
            }
            const newCart = await CartsDao.createCart(cart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }
    
    static async addProductToCart(cid, pid) {
        try {
            const cart = await CartsDao.getCart(cid)
            //TODO logica validar si ya existe en el carrito
            cart.products.push({id: pid, quantity:1})
            const updatedCart = await CartsDao.updateCart(cid, cart)
            return updatedCart
        } catch (error) {
            console.log(error)
        }
    }
    
    static async purchaseCart(cid) {
        try {
            const cart = await CartsDao.getCart(cid)
            const cartAvailable = []
            const cartNotAvailable = []
            cart.products.forEach(async (product) => {
                const productInDb = await ProductsService.getProduct(product.id)
                if (!productInDb || productInDb.stock < product.quantity) {
                    //TODO logica para validar stock y que exista el producto
                    cartNotAvailable.push(product)
                }
                cartAvailable.push({...product, price: productInDb.price})
                const updatedProduct = {
                    title: productInDb.title,
                    stock: productInDb.stock - product.quantity,
                    price: productInDb.price
                }
                await ProductsService.updateProduct(product.id, updatedProduct)
            })
            await CartsDao.updateCart(cid, cartNotAvailable)
            
            const ticket = await TicketsService.saveTicket(cartAvailable, cart.userId)
            return ticket
        } catch (error) {
            console.log(error)
        }
    }
}