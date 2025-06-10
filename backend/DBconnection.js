import mongoose from "mongoose";


const connectDB = async () => {
    try {
        // Include the database name in the connection string
        await mongoose.connect("mongodb+srv://rr935370:XKNJIuVQyMVCmK0V@cluster0.qfyzn.mongodb.net/resumedb?retryWrites=true&w=majority", {
            useNewUrlParser: true, // Avoid deprecation warnings
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000, // Wait max 5 sec for DB response
            socketTimeoutMS: 30000, // Avoid deprecation warnings
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Event listeners for connection status
mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("Database connected");
});

export default connectDB