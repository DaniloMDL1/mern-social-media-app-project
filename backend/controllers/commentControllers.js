import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"

export const createComment = async (req, res) => {
    try {
        const { comment, postedBy, postId } = req.body
        const userId = req.user._id

        if(!comment || !postedBy || !postId) return res.status(400).json({ error: "Comment, postedBy and postId are required for creating a comment." })

        const user = await User.findById(postedBy)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(user._id.toString() !== userId.toString()) return res.status(401).json({ error: "User is not authorized to create a comment." })

        const newComment = new Comment({
            comment,
            postedBy,
            postId
        })
        const savedComment = await newComment.save()
        res.status(201).json(savedComment)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const comment = await Comment.findById(id)
        if(!comment) return res.status(404).json({ error: "Comment not found." })

        if(comment.postedBy.toString() !== userId.toString()) return res.status(401).json({ error: "User is not authorized to delete a comment." })

        await Comment.findByIdAndDelete(id)

        res.status(200).json({ msg: "Comment is successfully deleted." })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getPostComments = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if(!post) return res.status(404).json({ error: "Post not found." })

        const comments = await Comment.find({ postId: id }).sort({ createdAt: -1 })

        res.status(200).json(comments)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}