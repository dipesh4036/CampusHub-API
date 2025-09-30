import express, { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import requireAPIKey from '../middlewares/apikey.middleware.js'
import { roleMiddleware } from '../middlewares/role.middleware.js'
import { createResult, seeResult } from '../controllers/result.controllers.js'

const router = express.Router()

router.use(authMiddleware,requireAPIKey)

router.post('/results', roleMiddleware('ADMIN'), createResult)
router.get('/results/:id', seeResult)

export default router


