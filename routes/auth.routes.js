import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {userRegister,userLogin,apiKey,profile} from '../controllers/auth.controllers.js'
import requireAPIKey from '../middlewares/apikey.middleware.js'

const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/api-key',authMiddleware, apiKey)

router.get('/me',requireAPIKey, authMiddleware, profile)

export default router