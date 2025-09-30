import express from 'express'
import requireAPIKey from '../middlewares/apikey.middleware.js'
import { roleMiddleware } from '../middlewares/role.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {createAttendance,adminSeeAttendance,userAttendance} from '../controllers/attendance.controllers.js'

const router = express.Router()
router.use(authMiddleware,requireAPIKey)

router.post('/courses/:id/attendance',roleMiddleware('ADMIN','FACULTY'),createAttendance)
router.get('/courses/:id/attendance',roleMiddleware('ADMIN','FACULTY'),adminSeeAttendance)
router.get('/users/:id/attendance',userAttendance)

export default router