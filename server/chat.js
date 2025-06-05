const Message = require("./src/models/message");
module.exports = (io, socket) => {
  socket.on("sendMessage", async ({ receiverId, content }) => {
    try {
      const newMessage = await Message.create({
        senderId: socket.user._id,
        receiverId,
        content,
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // Gönderene anında geri bildir
      socket.emit("messageSent", newMessage);
      // Alıcı çevrimiçiyse ona mesaj gönder
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      }
    } catch (err) {
      socket.emit("messageError", { error: true, message: "Mesaj gönderilemedi" });
    }
  });
};