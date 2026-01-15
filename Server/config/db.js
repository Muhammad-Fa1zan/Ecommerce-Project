import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${connected.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;
