import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import useEventCall from "../../../hook/useEventCall";
import { addMessage } from "../hooks/eventSlice";

const ChatScreenMessageForm = ({ chatId, socket, chat, users }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.event); // ✅ Redux mesajları
  const { getMessage, postMessage } = useEventCall();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  
  
// console.log(messages);

  // 📌 İlk açılışta eski mesajları çek
  useEffect(() => {
    if (chatId) {
      getMessage(chatId);
    }
  }, [chatId]);

  // 📌 Odaya katılma
  useEffect(() => {
    if (chatId) {
      socket.emit("room", chatId); // ✅ odaya katıl
      console.log(`Joined room: ${chatId}`);
    }
  }, [chatId, socket]);

  // 📌 Socket ile gelen mesajları dinle
  useEffect(() => {
    socket.on("messageReturn", (data) => {
      dispatch(addMessage(data)); // ✅ yeni mesajı Redux’a ekle
    });

    return () => {
      socket.off("messageReturn");
    };
  }, [socket, dispatch]);

  // console.log(chat);
  // 📌 Mesaj gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const messageContent = {
      content: message,
      sender: currentUser.username || currentUser.firstName,
      chatId: chat?.createdAt ? chat._id : null,
      receiverId: chat._id,
    };
    
    socket.emit("message", messageContent);
    postMessage(messageContent) // ✅ kendimiz de ekliyoruz
    setMessage("");
    
  };

  return (
    <Box flex={1} display="flex" flexDirection="column" height="100%">
      <Box flex={1} p={2} overflow="auto" display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>
          {chat?.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {messages.map((msg, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              mb: 2,
              maxWidth: "70%",
              alignSelf:
                msg.sender._id === currentUser._id
                  ? "flex-end"
                  : "flex-start",
              bgcolor:
                msg.sender._id === currentUser._id 
                  ? "primary.light"
                  : "grey.200",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar src={msg.sender?.image} />
              
              <Typography fontWeight="bold">{msg.sender.username}</Typography>
              <Typography variant="caption" color="text.secondary" ml="auto">
                {msg?.createdAt}
              </Typography>
            </Box>
            <Typography>{msg.content}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Mesaj yazma alanı */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        p={2}
        borderTop={1}
        borderColor="divider"
      >
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Mesaj yaz..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatScreenMessageForm;






