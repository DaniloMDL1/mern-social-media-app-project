import express from "express"
import { followUnfollowUser, getUserProfile, searchForUsers, updateUserProfile } from "../controllers/userControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/profile/:query", getUserProfile)
router.get("/search", protectRoute, searchForUsers)
router.put("/follow/:id", protectRoute, followUnfollowUser)
router.put("/update/:id", protectRoute, updateUserProfile)

export default router