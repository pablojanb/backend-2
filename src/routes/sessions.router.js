import { Router } from "express"
import { passportCall } from "../utils/passportCall.js"
import AuthenticationController from "../controllers/authentication.controller.js"
//import { auth } from "../utils/auth.js"

const router = Router()

router.post('/register', passportCall('register'), AuthenticationController.register)
router.post('/login', passportCall('login'), AuthenticationController.login)
router.get('/logout', AuthenticationController.logout)
router.get('/current', passportCall('jwt'), AuthenticationController.current)
//router.get('/admin', passportCall('jwt'), auth('admin'), AuthenticationController.admin)

export default router