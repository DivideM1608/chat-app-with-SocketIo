const socket = io("http://localhost:3000")
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")


const user = prompt("what is your name?")
appendMessage("You joined")
socket.emit("new-user", user)

socket.on("chat-message", data => {
    appendMessage(`${data.user}: ${data.message}`)
})

socket.on("user-connected", user => {
    appendMessage(`${user} connected`)
})
socket.on("user-disconnected", user => {
    appendMessage(`${user} disconnected`)
})


messageForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    messageInput.value = ""
})


function appendMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
