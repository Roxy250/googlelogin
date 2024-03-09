import mongoose from "mongoose";

// Define a schema for the host information
const hostSchema = new mongoose.Schema({
    // SocketId: {
    //     type: String,
    // },
    hosting_room_name: {
        type: String,
    },
    hosting_password: {
        type: String,
    },
    // isHost:{
    //     type:Boolean,
    // }
});

// Create a model for the host information
const Host = mongoose.model("Host", hostSchema);

export default Host;
