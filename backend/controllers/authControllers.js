import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body

        const user = await User.findOne({ $or: [{ email }, { username }]})
        if(user) return res.status(400).json({ error: "User already exists." })

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            email,
            password: passwordHash
        })
        const savedUser = await newUser.save()
        generateTokenAndSetCookie(savedUser._id, res)
        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            username: savedUser.username,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
            bio: savedUser.bio
        })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) return res.status(400).json({ error: "Email or password is incorrect." })

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio
        })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.status(200).json({ msg: "User is successfully logged out." })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}