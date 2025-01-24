import { productService } from "./index.js"
import { ticketsService } from './index.js'

export default class CartsService{
    
    constructor(dao){
        this.dao = dao
    }

    async createCart(uid) {
        try {
            const cart = {
                userId: uid,
                products: []
            }
            const newCart = await this.dao.createCart(cart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }
    
    async addProductToCart(cid, pid) {
        try {
            const cart = await this.dao.getCart(cid)
            const product = await productService.getProduct(pid)
            if (!cart || !product) return null
            const alreadyInCart = cart.products.findIndex(product=>product.id === pid)
            if (alreadyInCart > -1) {
                cart.products[alreadyInCart].quantity += 1
            } else {
                cart.products.push({id: pid, quantity:1})
            }
            const updatedCart = await this.dao.updateCart(cid, cart)
            return updatedCart
        } catch (error) {
            console.log(error)
        }
    }
    
    async purchaseCart(cid) {
        try {
            const cart = await this.dao.getCart(cid)
            if (!cart) return null
            const cartAvailable = []
            const cartNotAvailable = []

            for (const product of cart.products) {
                const productInDb = await productService.getProduct(product.id)
                if (!productInDb || productInDb.stock < product.quantity) {
                    cartNotAvailable.push(product.id)
                } else {
                    cartAvailable.push({...product, price: productInDb.price})
                    const updatedProduct = {
                    title: productInDb.title,
                    stock: productInDb.stock - product.quantity,
                    price: productInDb.price
                }
                await productService.updateProduct(product.id, updatedProduct)
                }
            }

            cart.products = cart.products.filter(product=> cartNotAvailable.includes(product.id))
            await this.dao.updateCart(cid, cart)
            
            if (cartAvailable.length < 1) return null
            
            const ticket = await ticketsService.saveTicket(cartAvailable, cart.userId)
            return ticket
        } catch (error) {
            console.log(error)
        }
    }
}