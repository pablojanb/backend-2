import { Router } from "express"
import { passportCall } from "../utils/passportCall.js"
import AuthenticationController from "../controllers/authentication.controller.js"

const router = Router()

router.post('/register', passportCall('register'), AuthenticationController.register)
router.post('/login', passportCall('login'), AuthenticationController.login)
router.get('/logout', AuthenticationController.logout)
router.get('/current', passportCall('jwt'), AuthenticationController.current)

export default router