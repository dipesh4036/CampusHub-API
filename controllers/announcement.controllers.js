import asyncHandler from "../utils/asyncHandler.js";
import {prisma} from '../index.js'
import APIError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createAnnouncements = asyncHandler(async(req,res) => {
    const {title,content} = req.body

    if (!title || !content) {
        throw new APIError(401,"All fields are required")
    }

    const announcement = await prisma.announcement.create({
        data: {
            title,
            content,
            createdById: req.user.id
        }
    })

    return res.status(201).json(new ApiResponse(true, "Announcement created successfully", announcement))
})
export const seeAnnouncements = asyncHandler(async(req,res) => {
    const announcements = await prisma.announcement.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    })

    return res.status(200).json(new ApiResponse(true, "Announcements fetched successfully", announcements))
})