import mongoose from 'mongoose';


const MONGODB_URI = 'mongodb://localhost:27017/mydatabase';


// Function to establish the MongoDB connection
const connectToDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export the connectToDatabase function
export default connectToDatabase;
