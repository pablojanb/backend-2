import UsersService from "./users.service.js"
import UsersDao from "../../dao/users.dao.js"

export const usersService = new UsersService(UsersDao)