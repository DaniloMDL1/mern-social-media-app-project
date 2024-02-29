import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import { v2 as cloudinary } from "cloudinary"

export const createPost = async (req, res) => {
    try {
        const { desc, postedBy } = req.body
        let { postPic } = req.body
        const userId = req.user._id

        if(!postedBy || !desc) return res.status(400).json({ error: "Desc for a post is required." })

        const user = await User.findById(postedBy)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(user._id.toString() !== userId.toString()) return res.status(401).json({ error: "User is not authorized to create a post." })

        if(postPic) {
            const uploadedResponse = await cloudinary.uploader.upload(postPic)
            postPic = uploadedResponse.secure_url
        }

        const newPost = new Post({
            desc,
            postPic,
            postedBy
        })

        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const post = await Post.findById(id)
        if(!post) return res.status(404).json({ error: "Post not found." })

        if(post.postedBy.toString() !== userId.toString()) return res.status(401).json({ error: "User is not authorized to delete a post." })

        if(post.postPic) {
            const postPicId = post.postPic.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(postPicId)
        }

        await Post.findByIdAndDelete(id)

        res.status(200).json({ msg: "Post is successfully deleted." })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const post = await Post.findById(id)
        if(!post) return res.status(404).json({ error: "Post not found." })

        const isLiked = post.likes.includes(userId)

        if(isLiked) {
            await Post.findByIdAndUpdate(id, { $pull: { likes: userId }})
            return res.status(200).json({ msg: "Post is unliked." })
        } else {
            await Post.findByIdAndUpdate(id, { $push: { likes: userId }})
            return res.status(200).json({ msg: "Post is liked." })
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if(!post) return res.status(404).json({ error: "Post not found." })

        res.status(200).json(post)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params

        const user = await User.findOne({ username })
        if(!user) return res.status(404).json({ error: "User not found." })

        const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 })
        
        res.status(200).json(posts)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        const following = user.following

        const posts = await Post.find({ postedBy: { $in: following }}).sort({ createdAt: -1 })

        res.status(200).json(posts)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}