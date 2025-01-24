import CartsDao from '../dao/carts.dao.js'
import ProductsDao from '../dao/products.dao.js'
import ResetPasswordsDao from "../dao/resetPasswords.dao.js"
import TicketsDao from "../dao/tickets.dao.js"
import UsersDao from "../dao/users.dao.js"

import CartsService from "./carts.service.js"
import ProductsService from "./products.service.js"
import ResetPasswordsService from "./resetPasswords.service.js"
import TicketsService from "./tickets.service.js"
import UsersService from "./users.service.js"

export const cartsService = new CartsService(CartsDao)
export const productService = new ProductsService(ProductsDao)
export const resetPasswordService = new ResetPasswordsService(ResetPasswordsDao)
export const ticketsService = new TicketsService(TicketsDao)
export const usersService = new UsersService(UsersDao)