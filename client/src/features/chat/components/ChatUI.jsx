import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import ChatScreenMessageForm from "./ChatScreenMessageForm";
import io from "socket.io-client";
import axios from "axios";
import useEventCall from "../../../hook/useEventCall";
import { useSelector } from "react-redux";

const socket = io.connect(import.meta.env.VITE_BASE_URL);

const ChatUI = () => {
  const { getUserChats } = useEventCall();
  const { currentUser } = useSelector((state) => state.auth);

  const { chats: initialChats } = useSelector((state) => state.event);
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chats, setChats] = useState(initialChats);

  // fetch chats for the user
  useEffect(() => {
    getUserChats("chats");
  }, []);

  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);

  // ✅ Component açıldığında tüm kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
        setUsers(res.data.result);
        setFilteredUsers(res.data.result);
      } catch (error) {
        console.error("Kullanıcılar alınamadı:", error);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Arama yapıldığında filtreleme
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  // ✅ Kullanıcı seçilince chat listesine ekle
  const handleSelectUser = (user) => {
    const exists = chats.find((chat) => chat._id === user._id );

    if (!exists) {
      setChats((prev) => [
        ...prev,
        {
          _id: user._id,
          username: `${user.firstName} ${user.lastName}`,
          type: "private",
        },
      ]);
    }
    setActiveChat({
      _id: user._id,
      username: `${user.firstName} ${user.lastName}`,
      type: "private",
    });
    setSearch("");
  };

  return (
    <Box
      display="flex"
      height="80vh"
      border={1}
      borderColor="divider"
      borderRadius={2}
    >
      {/* Sohbet Listesi (Sidebar) */}
      <Box width={280} borderRight={1} borderColor="divider" overflow="auto">
        <Typography variant="h6" p={2}>
          Chats
        </Typography>

        {/* 🔎 SearchBar */}
        <Box px={2} pb={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Kullanıcı ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Divider />

        {/* Chats listesi */}
        <List>
          {chats.map((chat) => {
            const isGroupChat = !!chat.chatName;
            let chatName;
            if (isGroupChat) {
              chatName = chat.chatName;
            } else {
              let member;
              if (chat.users) {
                 member = chat?.users?.find(
                  (user) => user._id !== currentUser._id
                );
              }else{
                member =chat
              }
              chatName = member ? member.username : "Unknown User";
            }
            return (
              <ListItem
                key={chat._id}
                button
                selected={activeChat?._id === chat._id}
                onClick={() => setActiveChat(chat)}
              >
                <ListItemText
                  primary={chatName}
                  secondary={isGroupChat && "Grup"}
                />
              </ListItem>
            );
          })}
        </List>

        {/* 🔎 Arama sonuçları (kullanıcı seçme) */}
        {search && (
          <>
            <Divider />
            <Typography variant="body2" px={2} pt={1}>
              Kullanıcılar
            </Typography>
            <List>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <ListItem
                    key={user._id}
                    button
                    onClick={() => handleSelectUser(user)}
                  >
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={user.username}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Sonuç bulunamadı" />
                </ListItem>
              )}
            </List>
          </>
        )}
      </Box>

      {/* Ana Sohbet Ekranı */}
      <Box flex={1} display="flex" flexDirection="column">
        {activeChat ? (
          <ChatScreenMessageForm
            chatId={activeChat._id}
            socket={socket}
            chat={activeChat}
            users={users}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <Typography variant="body1">Bir sohbet seçin</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatUI;
