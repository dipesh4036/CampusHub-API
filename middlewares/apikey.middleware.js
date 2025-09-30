import APIError from "../utils/APIError.js";
import { prisma } from "../index.js";

const requireAPIKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return next(new APIError(403, 'Forbidden: Invalid or missing API key'));
    }
    const keyRecord = await prisma.apiKey.findUnique({ where: { key: apiKey } });
    if (!keyRecord) return next(new APIError(401, "Invalid API key"));
    next();
};

export default requireAPIKey;