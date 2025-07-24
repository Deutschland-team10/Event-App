import { db } from "../../../helper/firebase";
import { ref, push, get, onValue, off } from "firebase/database";

export const sendMessage = (chatId, message) => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    push(messagesRef, message);
};

export const getMessages = async (chatId) => {
    const snapshot = await get(ref(db, `chats/${chatId}/messages`));
    return snapshot.val() || [];
};

export const onNewMessage = (chatId, callback) => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    onValue(messagesRef, (snapshot) => {
        const newMsg = snapshot.val();
        if (newMsg) callback(newMsg);
    });
    return () => off(messagesRef);
};