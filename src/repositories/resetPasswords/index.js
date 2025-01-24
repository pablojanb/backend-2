import ResetPasswordsDao from "../../dao/resetPasswords.dao.js"
import ResetPasswordsService from "./resetPasswords.service.js"

export const resetPasswordService = new ResetPasswordsService(ResetPasswordsDao)