import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createComment, deleteComment, getPostComments } from "../controllers/commentControllers.js"

const router = express.Router()

router.get("/post/:id", getPostComments)
router.post("/create", protectRoute, createComment)
router.delete("/delete/:id", protectRoute, deleteComment)

export default router