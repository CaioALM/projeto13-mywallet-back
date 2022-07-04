import { Router } from 'express'
import { inputFlux, outputFlux }  from '../controllers/fluxController.js'
import { getMainPage } from '../controllers/mainpageController.js'
import validateToken from '../middlewares/authMiddleware.js'

const router = Router()
   
router.use(validateToken)
router.get('/mainpage', getMainPage)
router.post('/outFlux', inputFlux)
router.post('/inFlux', outputFlux)


export default router