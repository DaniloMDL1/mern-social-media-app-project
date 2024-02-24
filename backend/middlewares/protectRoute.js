import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({ error: "User is unauthorized." })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        req.user = user
        next()
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export default protectRoute