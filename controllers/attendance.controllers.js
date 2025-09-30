import { prisma } from "../index.js";
import APIError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const createAttendance = asyncHandler(async (req, res) => {
    const { studentId, date, present } = req.body
    const courseId = Number(req.params.id)

    if (!studentId || !date || !present) {
        throw new APIError(404, "All Field are require")
    }

    const attendance = await prisma.attendance.create({
        data: {
            studentId: studentId,
            courseId: courseId,
            date, present
        }
    })
    res.json(new ApiResponse(true, 201, "Mark Attendance Successfully"))
})
export const adminSeeAttendance = asyncHandler(async (req, res) => {
    const courseId = Number(req.params.id)
    const Attendance = await prisma.attendance.findUnique({
        where: {
            id: courseId
        }
    })

    res.json(new ApiResponse(true, 201, Attendance, "attendance fetched successfully"))
})
export const userAttendance = asyncHandler(async (req, res) => {
    const userId = Number(req.params.id)
    const Attendance = await prisma.attendance.findUnique({
        where: {
            id: userId
        }
    })

    res.json(new ApiResponse(true, 201, Attendance, "attendance fetched successfully"))
})