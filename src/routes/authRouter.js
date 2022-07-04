import { Router } from 'express'
import { userSignIn, userSignUp } from '../controllers/userControllers.js'

const router = Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)

export default router 