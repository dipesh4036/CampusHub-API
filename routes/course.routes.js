import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import requireAPIKey from '../middlewares/apikey.middleware.js';
import { allCourses, createCourses, createMaterial, materials } from '../controllers/course.controllers.js'


const router = express.Router()

router.use(authMiddleware, requireAPIKey)

router.get('/courses', allCourses)
router.post('/courses', roleMiddleware('ADMIN'), createCourses)
router.post('/courses/:id/material', roleMiddleware('FACULTY'), createMaterial)
router.get('/courses/:id/materials', materials)


export default router