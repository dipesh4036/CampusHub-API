import { prisma } from "../index.js";
import APIError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createEvent = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const { title, startDate, endDate, location } = req.body

    if (!title || !startDate || !endDate || !location) {
        throw new APIError(404, "all field are require")
    }

    const event = await prisma.event.create({
        data: {
            title, startDate, endDate, location, createdById: userId
        }
    })

    res.json(new ApiResponse(true, 201, event, "event created successfully"))
})
export const seeEvent = asyncHandler(async (req, res) => {
    const allEvents = await prisma.event.findMany()

    res.json(new ApiResponse(true, 201, allEvents, "event fecth successfully"))
})
export const eventById = asyncHandler(async (req, res) => {
    const eventId = Number(req.params.id)

    if (!eventById) {
        throw new APIError(404,"event id not found")
    }

    const event = await prisma.event.findUnique({
        where: {
            id: eventId
        }
    })

    if (!event) {
        throw new APIError(404, "event not found")
    }

    res.json(new ApiResponse(true, 201, event, "event fecth successfully"))
})