import APIError from '../utils/APIError.js'


export const roleMiddleware = (...roles) => {
    return (req, _, next) => {
        const userRole = req.user?.role

        if (roles.includes(userRole)) {
            next()
        } else {
            next(new APIError(403,'You are not authorized to access this route'))
        }
    }
}