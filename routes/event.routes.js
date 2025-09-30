import express from 'express'
import requireAPIKey from '../middlewares/apikey.middleware.js'
import { roleMiddleware } from '../middlewares/role.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {createEvent,seeEvent,eventById} from '../controllers/event.controllers.js'

const router = express.Router()
router.use(authMiddleware,requireAPIKey)

router.post('/events',roleMiddleware('ADMIN','FACULTY'),createEvent)
router.get('/events',seeEvent)
router.get('/events/:id',eventById)

export default router