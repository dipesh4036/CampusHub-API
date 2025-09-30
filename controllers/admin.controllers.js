import { prisma } from "../index.js";
import APIError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async(req,res) => {
    const allUser = await prisma.user.findMany()

    res.json(new ApiResponse(true,201,allUser,"all user data fetched"))
})
export const changeRole = asyncHandler(async(req,res) => {
    const userId = Number(req.params.id)
    const {role } = req.body

    if(!['USER','FACULTY','ADMIN'].includes(role)){
        throw new APIError("Role must be one of USER, FACULTY, ADMIN",400)
    }

    const changeRole = await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            role
        }
    })
    res.json(new ApiResponse(true,200,changeRole,"user role changed successfully"))
})