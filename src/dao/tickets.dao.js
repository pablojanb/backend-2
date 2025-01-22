import ticketsModel from "../models/tickets.model.js"

export default class TicketsDao{

    static async saveTicket(ticket) {
        try {
            const newTicket = await ticketsModel.create(ticket)
            return newTicket
        } catch (error) {
            console.log(error)
        }
    }
}