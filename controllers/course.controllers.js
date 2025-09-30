import { prisma } from "../index.js";
import APIError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const allCourses = asyncHandler(async (req, res) => {
    const allCourses = await prisma.course.findMany()

    res.json(new ApiResponse(true, 201, allCourses, "course all data fecth successfully"))
})
export const createCourses = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const { name, facultyId } = req.body

    if (!name || !facultyId) {
        throw new APIError(404, "all fields are require")
    }

    const course = await prisma.course.create({
        data: {
            name, facultyId
        }
    })

    res.json(new ApiResponse(true, 201, course, "course created successfully"))
})
export const createMaterial = asyncHandler(async (req, res) => {

    const uploadedById = req.user.id
    const { courseId, title, description } = req.body

    if (!courseId || !title || !description) {
        throw new APIError(404, "all fields are requies")
    }

    const material = await prisma.material.create({
        data: {
            courseId, title, description, uploadedById
        }
    })

    res.json(new ApiResponse(201, true, material, "material created successfully"))
})

export const materials = asyncHandler(async (req, res) => {
    const courseId = Number(req.params.id)

    const material = await prisma.material.findUnique({ where: { id: courseId } })

    res.json(new ApiResponse(true, 201, material, "material fecth successfully"))
})