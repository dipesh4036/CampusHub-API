import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { roleMiddleware } from '../middlewares/role.middleware.js'
import requireAPIKey from '../middlewares/apikey.middleware.js'
import { getAllUsers, changeRole } from '../controllers/admin.controllers.js'

const router = express.Router()

router.use(roleMiddleware('ADMIN'), authMiddleware, requireAPIKey)

router.get("/admin/users", getAllUsers)
router.put("/admin/users/:id/role", changeRole)


export default router