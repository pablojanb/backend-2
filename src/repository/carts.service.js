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
            const alreadyInCart = cart.products.findIndex(product=>product.id === pid)
            if (alreadyInCart > -1) {
                cart.products[alreadyInCart].quantity += 1
            } else {
                cart.products.push({id: pid, quantity:1})
            }
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

            for (const product of cart.products) {
                const productInDb = await ProductsService.getProduct(product.id)
                if (!productInDb || productInDb.stock < product.quantity) {
                    cartNotAvailable.push(product.id)
                } else {
                    cartAvailable.push({...product, price: productInDb.price})
                    const updatedProduct = {
                    title: productInDb.title,
                    stock: productInDb.stock - product.quantity,
                    price: productInDb.price
                }
                await ProductsService.updateProduct(product.id, updatedProduct)
                }
            }

            cart.products = cart.products.filter(product=> cartNotAvailable.includes(product.id))
            await CartsDao.updateCart(cid, cart)
            
            if (cartAvailable.length > 0) {
                const ticket = await TicketsService.saveTicket(cartAvailable, cart.userId)
            return ticket
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }
}