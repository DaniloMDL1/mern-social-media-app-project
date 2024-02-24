import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const app = express()
app.use(express.json({ limit: "30mb" }))
app.use(express.json({ limit: "30mb", extended: true }))
app.use(cookieParser())

// CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

connectToMongoDB()
const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))