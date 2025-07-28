import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, Divider } from "@mui/material";
import { getMessages, onNewMessage } from "../services/chatService";

const ChatScreen = ({ chat,socket }) => {
    const [messages, setMessages] = useState([]);
    const [MessageList,setMessageList] = useState([]);

    useEffect(() => {
        socket.on("messageReturn", (data)=>{
            setMessageList((prev) => [...prev, data]);
        }) 

        getMessages(chat.id).then((msgs) => setMessages(msgs));
        const unsubscribe = onNewMessage(chat.id, (newMsg) => {
            setMessages((prev) => [...prev, newMsg]);
        });
        return () => unsubscribe();
    }, [chat.id]);

    return (
        <Box flex={1} p={2} overflow="auto">
            <Typography variant="h6" gutterBottom>
                {chat.name}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {messages.map((msg) => (
                <Paper
                    key={msg.id}
                    elevation={2}
                    sx={{
                        p: 2,
                        mb: 2,
                        maxWidth: "70%",
                        alignSelf: msg.sender === sender ? "flex-end"  : "flex-start",
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Avatar>{msg.sender.charAt(0)}</Avatar>
                        <Typography fontWeight="bold">{msg.sender}</Typography>
                    </Box>
                    <Typography>
                        {msg.text}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default ChatScreen;