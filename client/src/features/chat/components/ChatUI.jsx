import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
} from "@mui/material";
import ChatScreen from "./ChatScreen";
import MessageForm from "./MessageForm";
import io from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_BASE_URL)

const ChatUI = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [chats] = useState([
        { id: "group1", name: "Event Allgemeine Gruppe", type: "group" },
        { id: "user1", name: "Ahmet Yılmaz", type: "private" },
        { id: "user2", name: "Ayse Günes", type: "private" },
    ]);

    return (
        <Box display="flex" height="80vh" border={1} borderColor="divider" borderRadius={2}>
            {/* Sohbet Listesi (Sidebar) */}
            <Box width={250} borderRight={1} borderColor="divider" overflow="auto">
                <Typography variant="h6" p={2}>
                    Chats
                </Typography>
                <Divider />
                <List>
                    {chats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            button
                            selected={activeChat?.id === chat.id}
                            onClick={() => setActiveChat(chat)}
                        >
                            <ListItemText
                                primary={chat.name}
                                secondary={chat.type === "group" ? "Gruppe" : "Individuell"}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Ana Sohbet Ekranı */}
            <Box flex={1} display="flex" flexDirection="column">
                {activeChat ? (
                    <>
                        <ChatScreen chat={activeChat} socket={socket} />
                        <MessageForm chatId={activeChat.id} socket={socket} />
                    </>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
                        <Typography variant="body1">Wählen Sie einen Chat</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ChatUI;