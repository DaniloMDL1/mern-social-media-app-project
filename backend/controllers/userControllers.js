import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"
import mongoose from "mongoose"

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const userToFollow = await User.findById(id)
        const loggedInUser = await User.findById(userId)

        if(!userToFollow || !loggedInUser) return res.status(404).json({ error: "User not found." })
        if(id === userId.toString()) return res.status(400).json({ error: "You cannot follow or unfollow yourself." })

        const isFollowing = loggedInUser.following.includes(id)

        if(isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: userId }})
            await User.findByIdAndUpdate(userId, { $pull: { following: id }})
            return res.status(200).json({ msg: "User is unfollowed." })
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: userId }})
            await User.findByIdAndUpdate(userId, { $push: { following: id }})
            return res.status(200).json({ msg: "User is followed." })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { fullName, username, email, password, bio } = req.body
        let { profilePic } = req.body
        const { id } = req.params
        const userId = req.user._id

        let user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(id !== userId.toString()) return res.status(401).json({ error: "User is not able to update other user's profile." })

        if(password) {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        if(profilePic) {
            if(user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic)
            profilePic = uploadedResponse.secure_url
        }

        user.fullName = fullName || user.fullName
        user.username = username || user.username
        user.email = email || user.email
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio

        user = await user.save()

        res.status(200).json(user)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { query } = req.params

        let user

        if(mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select("-password")
        } else {
            user = await User.findOne({ username: query }).select("-password")
        }

        if(!user) return res.status(404).json({ error: "User not found." })
        
        res.status(200).json(user)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const searchForUsers = async (req, res) => {
    try {
        const { username } = req.query

        const user = await User.find({ username: { $regex: username, $options: "i" }}).select("-password")
        if(!user) return res.status(404).json({ error: "User not found." })

        res.status(200).json(user)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}