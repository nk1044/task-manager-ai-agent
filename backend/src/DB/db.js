import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

export { connectDB };