import { usersService } from "../users/index.js"

export default class TicketsService{

    constructor(dao){
        this.dao = dao
    }

    async saveTicket(cart, userId) {
        try {
            const user = await usersService.getUser(userId)
            const amount = cart.reduce((acc, product)=> acc + (product.price * product.quantity), 0)
            const ticket = {
                amount,
                purchaser: user.email,
            }
            const newTicket = await this.dao.saveTicket(ticket)
            return newTicket
        } catch (error) {
            console.log(error)
        }
    }
}