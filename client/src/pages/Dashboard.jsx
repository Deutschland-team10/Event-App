// pages/Dashboard.jsx
import React, { useState } from "react";
import { Drawer, Toolbar, Box, Dialog } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Outlet, useLocation } from "react-router-dom";
import EventForm from "../components/EventForm";
import EventList from "./EventList";

const drawerWidth = 240;

const Dashboard = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 101,
      image: "https://cdn.pixabay.com/photo/2022/07/17/13/41/sunflower-7327456_1280.jpg",
      title: "React Workshop",
      description: "Modern React uygulamaları geliştirme workshop'u...",
      date: new Date("2024-07-15T14:00:00").toISOString(),
      community: "technology",
      address: "İTÜ, Bilgisayar Mühendisliği",
      organizer: "Ahmet K.",
      coordinates: { lat: 41.0082, lng: 28.9784 },
      avatarGroup: [
        { name: "Ali", avatar: "https://i.pravatar.cc/150?img=1" },
        { name: "Ayşe", avatar: "https://i.pravatar.cc/150?img=2" },
      ],
    },
    {
      id: 102,
      image: "https://cdn.pixabay.com/photo/2022/07/17/13/41/sunflower-7327456_1280.jpg",
      title: "Node.js Eğitimi",
      description: "Backend geliştirme eğitimi...",
      date: new Date("2024-07-20T14:00:00").toISOString(),
      community: "technology",
      address: "Bonn",
      organizer: "Mehmet Y.",
      coordinates: { lat: 41.0082, lng: 28.9784 },
      avatarGroup: [
        { name: "Ali", avatar: "https://i.pravatar.cc/150?img=1" },
        { name: "Ayşe", avatar: "https://i.pravatar.cc/150?img=2" },
      ],
    },
  ]);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleEventSubmit = (data) => {
    const newEvent = {
      ...data,
      id: Date.now(),
      organizer: "Sen",
      avatarGroup: [],
      coordinates: null,
      date: data.date ? new Date(data.date).toISOString() : null,
      image: data.image || "https://cdn.pixabay.com/photo/2022/07/17/13/41/sunflower-7327456_1280.jpg",
    };
    setEvents((prev) => [...prev, newEvent]);
    setShowEventForm(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* === Sidebar === */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <SidebarItems setShowEventForm={setShowEventForm} />
      </Drawer>

      {/* === Ana İçerik === */}
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` } 
        }}
      >
        <Toolbar />
        
        {/* Ana sayfada EventList göster, diğer sayfalarda Outlet */}
        {isHomePage ? (
          <EventList 
            events={events}
            showEventForm={showEventForm}
            setShowEventForm={setShowEventForm}
            onEventSubmit={handleEventSubmit}
          />
        ) : (
          <Outlet />
        )}
      </Box>

      {/* === EventForm Modal === */}
      <Dialog
        open={showEventForm}
        onClose={() => setShowEventForm(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <EventForm
          onClose={() => setShowEventForm(false)}
          onSubmit={handleEventSubmit}
        />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
