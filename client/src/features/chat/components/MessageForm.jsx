import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { sendMessage } from "../services/chatService";

const MessageForm = ({ chatId ,socket}) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        sendMessage(chatId, {
            content: content,
            sender: sender,
            romm: room,
            date: (new Date(Date.now)).getHours() + ":" + (new Date(Date.now)).getMinutes() 
        });
        socket.emit('message', sendMessage)
        setMessage("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} p={2} borderTop={1} borderColor="divider">
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
    );
};

export default MessageForm;