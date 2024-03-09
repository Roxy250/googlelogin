// // import { Server } from 'socket.io';
// // import Host from './models/host_schema.js';

// // const websocket = (server) => {
// //     const io = new Server(server, {
// //         cors: {
// //             origin: 'http://localhost:5173',
// //             methods: ['GET', 'POST'],
// //             credentials: true,
// //         }
// //     });

// //     io.on('connection', (socket) => {
// //         console.log('User connected', socket.id);

// //         // socket.on('hostRoom', async (payload) => {
// //         //     try {
// //         //         const existingHost = await Host.findOne({ hosting_room_name: payload.hosting_room_name });
// //         //         if (existingHost) {
// //         //             io.to(socket.id).emit('roomAlreadyHosted', { message: 'Room already hosted' });
// //         //         } else {
// //         //             const newHost = new Host({
// //         //                 SocketId: payload.SocketId,
// //         //                 hosting_room_name:payload.hosting_room_name,
// //         //                 hosting_password: payload.hosting_password,
// //         //                 isHost: payload.isHost
// //         //             });
// //         //             await newHost.save();
// //         //             socket.join(payload.hosting_room_name);
// //         //             console.log(`user joined ${socket.id}`)
// //         //             io.to(socket.id).emit('roomCreated', { message: 'Room successfully created',room:payload.hosting_room_name });
// //         //         }
// //         //     } catch (error) {
// //         //         console.error('Error hosting room:', error);
// //         //     }
// //         // });

// //         socket.on('joinRoom',  (room) => {
// //             // try {
        
// //             //     const host = await Host.findOne({ hosting_room_name: payload.hosted_room_name });

// //             //     if (!host || host.hosting_password !== payload.hosted_password) {
// //             //         io.to(socket.id).emit('invalidRoom', { message: 'Invalid room name or password' });
// //             //         console.log("invalid room name or password",host);
// //             //     } else {
// //             //         socket.join(payload.hosted_room_name);
// //             //         io.to(socket.id).emit('roomJoined', { message: 'Room successfully joined',room:payload.hosted_room_name});
// //             //         console.log(`Room successfully joined ${socket.id}`)
// //             //     }
// //             // } catch (error) {
// //             //     console.error('Error joining room:', error);
// //             // }
// //             socket.join(room);
// //             console.log(`User join to romm ${room} by ${socket.id} Id!`);
// //         });

// //         socket.on('message',({message,roomName})=>{
// //             console.log(message,roomName);
// //             io.to(roomName).emit('receive',message);
// //         });


// //         socket.on('disconnect', () => {
// //             console.log('User disconnected', socket.id);
// //         });
// //     });
// // };

// // export default websocket;

// import { Server } from 'socket.io';
// import Host from './models/host_schema.js';

// const websocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: 'http://localhost:5173',
//             methods: ['GET', 'POST'],
//             credentials: true,
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log('User connected', socket.id);

//         socket.on('hostRoom', async (payload) => {
//             try {
//                 const existingHost = await Host.findOne({ hosting_room_name: payload.hosting_room_name });
//                 if (existingHost) {
//                     io.to(socket.id).emit('roomAlreadyHosted', { message: 'Room already hosted' });
//                 } else {
//                     const newHost = new Host({
//                         SocketId: payload.SocketId,
//                         hosting_room_name:payload.hosting_room_name,
//                         hosting_password: payload.hosting_password,
//                         isHost: payload.isHost
//                     });
//                     await newHost.save();
//                     socket.join(payload.hosting_room_name);
//                     console.log(`user joined ${socket.id}`)
//                     io.to(socket.id).emit('roomCreated', { message: 'Room successfully created',room:payload.hosting_room_name });
//                 }
//             } catch (error) {
//                 console.error('Error hosting room:', error);
//             }
//         });

//         socket.on('joinRoom', async (payload) => {
//             try {
//                 const host = await Host.findOne({ hosting_room_name: payload.hosted_room_name });

//                 if (!host || host.hosting_password !== payload.hosted_password) {
//                     io.to(socket.id).emit('invalidRoom', { message: 'Invalid room name or password' });
//                     console.log("invalid room name or password",host);
//                 } else {
//                     socket.join(payload.hosted_room_name);
//                     io.to(socket.id).emit('roomJoined', { message: 'Room successfully joined',room:payload.hosted_room_name});
//                     console.log(`Room successfully joined ${socket.id}`)
//                 }
//             } catch (error) {
//                 console.error('Error joining room:', error);
//             }
//         });

//         socket.on('message',({message,roomName})=>{
//             console.log(message,roomName);
//             io.to(roomName).emit('receive',message);
//         });

//         socket.on('disconnect', () => {
//             console.log('User disconnected', socket.id);
//         });
//     });
// };

// export default websocket;
import { Server } from 'socket.io';
import Host from './models/host_schema.js';

const websocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        socket.on('hostRoom', async (payload) => {
            try {
                const existingHost = await Host.findOne({ hosting_room_name: payload.hosting_room_name });
                if (existingHost) {
                    io.to(socket.id).emit('roomAlreadyHosted', { message: 'Room already hosted' });
                } else {
                    const newHost = new Host({
                        SocketId: payload.SocketId,
                        hosting_room_name: payload.hosting_room_name,
                        hosting_password: payload.hosting_password, // Include password in the host event payload
                        isHost: payload.isHost
                    });
                    await newHost.save();
                    socket.join(payload.hosting_room_name);
                    console.log(`user joined ${socket.id}`)
                    io.to(socket.id).emit('roomCreated', { message: 'Room successfully created', room: payload.hosting_room_name });
                }
            } catch (error) {
                console.error('Error hosting room:', error);
            }
        });

        socket.on('joinRoom', async (payload) => {
            try {
                const host = await Host.findOne({ hosting_room_name: payload.hosted_room_name });

                if (!host || host.hosting_password !== payload.hosted_password) {
                    io.to(socket.id).emit('invalidRoom', { message: 'Invalid room name or password' });
                    console.log("invalid room name or password", host);
                } else {
                    socket.join(payload.hosted_room_name);
                    io.to(socket.id).emit('roomJoined', { message: 'Room successfully joined', room: payload.hosted_room_name });
                    socket.to(payload.hosted_room_name).except(socket.id).emit('joined',`${socket.id} joined the room`);
                    console.log(`Room successfully joined ${socket.id}`);
                }
            } catch (error) {
                console.error('Error joining room:', error);
            }
        });

        socket.on('message', ({ message, roomName }) => {
            console.log(message, roomName);
            io.to(roomName).emit('receive', message);
        });

        socket.on('leave',({roomName})=>{
            socket.leave(roomName);
            socket.to(roomName).except(socket.id).emit('left',`${socket.id} left the room`);
        })
        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
};

export default websocket;
