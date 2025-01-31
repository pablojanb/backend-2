import { Router } from "express"
import { passportCall } from "../utils/passportCall.js"
import AuthenticationController from "../controllers/authentication.controller.js"

const router = Router()

router.post('/register', passportCall('register'), AuthenticationController.register)
router.post('/login', passportCall('login'), AuthenticationController.login)
router.get('/google', passportCall('google'))
router.get('/googleCallBack', passportCall('google'), AuthenticationController.login)
router.get('/github', passportCall('github'))
router.get('/githubCallBack', passportCall('github'), AuthenticationController.login)
router.get('/logout', AuthenticationController.logout)
router.get('/current', passportCall('jwt'), AuthenticationController.current)
router.post('/resetPassword', AuthenticationController.resetPassword)
router.post('/reset', AuthenticationController.reset)

export default router