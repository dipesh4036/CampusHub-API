# CampusHub API

Role-Based College Portal Backend built with **Express.js**, supporting Students, Faculty, and Admin roles. Implements **JWT authentication**, **API key access**, and **RBAC** for secure route management.

## Features
- **Authentication:** Register, login, and manage API keys.
- **Role-Based Access:** Middleware protects routes based on roles.
- **Announcements:** Faculty/Admin can post; all users can view.
- **Results:** Admin can post; Students can view their own, Faculty/Admin can view any.
- **Courses & Materials:** Admin can create courses, Faculty can upload materials, Students can view.
- **Admin Management:** Manage users and roles.
- **Bonus:** Attendance module support.

## API Documentation
Available on Postman: [CampusHub Collection](https://www.postman.com/aviation-specialist-40917932/campushub/collection/xpti4bn/campushub)

## Tech Stack
- Node.js & Express.js
- PostgreSQL
- JWT & API Key authentication
- RBAC middleware

## Setup
1. Clone the repo  
2. Install dependencies: `npm install`  
3. Configure `.env` with DB and JWT settings  
4. Run migrations: `npx prisma migrate dev`  
5. Start server: `npm run dev`  
