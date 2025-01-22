import TicketsDao from "../dao/tickets.dao.js"
import UsersService from "./users.service.js"

export default class TicketsService{
    static async saveTicket(cart, userId) {
        try {
            const user = await UsersService.getUser(userId)
            const amount = cart.reduce((acc, product)=> acc + product.price, 0)
            const ticket = {
                amount,
                purchaser: user.email
                //TODO logica para date con formato
            }
            const newTicket = await TicketsDao.saveTicket(ticket)
            return newTicket
        } catch (error) {
            console.log(error)
        }
    }
}