import APIError from '../utils/APIError.js'
import asyncHandler from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
import { prisma } from '../index.js'

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new APIError(404, "User Unauthorized")
    }


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
        throw new APIError(404, "User Unauthorized")
    }

    const user = await prisma.user.findUnique({
        where: { id: decodedToken.id }
    })

    req.user = user
    next()
})