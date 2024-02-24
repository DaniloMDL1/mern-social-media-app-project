import express from "express"
import { createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost } from "../controllers/postControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/feed", protectRoute, getFeedPosts)
router.get("/:id", getPost)
router.get("/user/:username", getUserPosts)
router.post("/create", protectRoute, createPost)
router.delete("/delete/:id", protectRoute, deletePost)
router.put("/like/:id", protectRoute, likeUnlikePost)

export default router