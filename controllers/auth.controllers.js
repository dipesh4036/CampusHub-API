import APIError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import { registerSchema, loginSchema } from '../validation/auth.validation.js'
import { prisma } from "../index.js";
import crypto from 'crypto'
import bcrypt from "bcryptjs";


export const userRegister = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body

    // validation
    const { error } = registerSchema.safeParse({ email, password, name })
    if (error) {
        throw new APIError(404, "all field are require")
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
        throw new APIError(401, "user already exists")
    }

    // passwordhased and save 
    const hasedPassword = await bcrypt.hash(password, 10)

    const createdUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hasedPassword
        }
    })


    res.json(new ApiResponse(201, true, createdUser, "user register Successfully"))
})

export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const { error } = loginSchema.safeParse({ email, password })
    if (error) {
        throw new APIError(404, "all fields are requies")
    }
    // user 
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new APIError(404, "user not found")
    }

    const matchPassword = bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new APIError(404, "password is not macth")
    }

    const Options = {
        httpOnly: true,
        secure: true
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)

    res.cookie("token", token, Options).json(new ApiResponse(true, 201, user, "user login successfully"))


})
export const apiKey = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const apiKey = crypto.randomBytes(32).toString("hex")

    if (!apiKey) {
        throw new APIError(404, "api key not created")
    }

    const userKey = await prisma.apiKey.create({
        data: {
            key: apiKey,
            userId: userId
        }
    })

    res.json(new ApiResponse(true, 201, { apiKey }, "api-key genretaed successfully"))
})
export const profile = asyncHandler(async (req, res) => {
    const user = req.user

    if (!user) {
        throw new APIError(401, "user not found")
    }

    res.json(new ApiResponse(true, 201, user, "user fecth successfully"))
})