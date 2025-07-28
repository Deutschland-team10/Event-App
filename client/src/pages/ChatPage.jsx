import React from "react";
import { Container } from "@mui/material";
import ChatUI from "../features/chat/components/ChatUI";


const ChatPage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <ChatUI/>
        </Container>
    );
};

export default ChatPage;