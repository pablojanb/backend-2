import TicketsDao from "../../dao/tickets.dao.js"
import TicketsService from "./tickets.service.js"

export const ticketsService = new TicketsService(TicketsDao)