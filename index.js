import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4000;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});

// * routes file
import authRoute from './routes/Auth.routes.js'
import announcements from './routes/announcement.routes.js'
import results from './routes/result.routes.js'
import courses from './routes/course.routes.js'
import events from './routes/event.routes.js'
import attendances from './routes/attendance.routes.js'
import admin from './routes/admin.routes.js'

app.use('/api', authRoute);
app.use('/api', announcements)
app.use('/api', results)
app.use('/api', courses)
app.use('/api', events)
app.use('/api', attendances)
app.use('/api', admin)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));