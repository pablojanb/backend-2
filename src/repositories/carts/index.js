import CartsDao from "../../dao/carts.dao.js"
import CartsService from "./carts.service.js"

export const cartsService = new CartsService(CartsDao)