import mongoose from "mongoose"

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB is successfully connected.")
        
    } catch(error) {
        console.log(`MongoDB error: ${error}`)
    }
}

export default connectToMongoDB