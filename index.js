const { Server } = require("socket.io");
const io = new Server(3000, { cors: { origin: '*' }})

const users = {}

io.on("connection", socket => {
    console.log("new User")
    socket.on("new-user", user => {
        users[socket.id] = user
        socket.broadcast.emit("user-connected", user)
    })
    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", {message: message, user: users[socket.id]})
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id]
    })
})