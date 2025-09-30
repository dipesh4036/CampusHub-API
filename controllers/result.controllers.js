import { prisma } from "../index.js";
import APIError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createResult = asyncHandler(async (req, res) => {
    const { studentId, courseId, grade } = req.body

    if (!studentId || !courseId || !grade) {
        throw new APIError(404, "all fields are require")
    }
    
    const result = await prisma.result.create({
        data: {
            studentId, courseId, grade,
            createdById: req.user?.id
        }
    })

    res.json(new ApiResponse(true, 201, result, "student result created Successfully"))
})

export const seeResult = asyncHandler(async (req, res) => {
    const userId = req.user.id

    let results;
    if (userId === "STUDENT") {
        const studentResult = await prisma.result.findUnique({
            where: { userId }
        })
        results = studentResult;
    } else {
        results = await prisma.result.findMany();
    }

    res.json(new ApiResponse(true, 200, results || [], "Results fetched successfully"));
})
