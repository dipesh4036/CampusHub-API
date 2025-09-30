import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {roleMiddleware} from '../middlewares/role.middleware.js'
import {createAnnouncements,seeAnnouncements} from '../controllers/announcement.controllers.js'
import requireAPIKey from '../middlewares/apikey.middleware.js'

const router = express.Router()

router.use(requireAPIKey)


router.post('/announcements', authMiddleware, roleMiddleware('ADMIN','FACULTY'),createAnnouncements)
router.get('/announcements', authMiddleware, seeAnnouncements)

export default router