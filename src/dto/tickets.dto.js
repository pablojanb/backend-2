export default class TicketsDto {
    constructor(ticket, cartNotAvailable) {
        this.purchase_datetime = ticket.purchase_datetime,
        this.amount = ticket.amount,
        this.purchaser = ticket.purchaser,
        this.ticketId = ticket.ticketId
        this.notAvailable = cartNotAvailable.length > 0 ? cartNotAvailable : 'none'
    }
}