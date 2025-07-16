// pages/Dashboard.jsx
import React, { useState } from "react";
import { Drawer, Toolbar, Box, Dialog } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Outlet, useLocation } from "react-router-dom";
import EventForm from "./EventForm";
import AktivitätForm from "../components/AktivitätForm"; // Modal için kullanacağız

const drawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [events, setEvents] = useState([]);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [initialState, setInitialState] = useState({
    title: "",
    description: "",
    date: null,
    community: "",
    guestCount: "",
    address: ""
  });

  const handleEventSubmit = (data) => {
    const newEvent = {
      ...data,
      organizer: "Sen",
      avatarGroup: [],
      coordinates: null,
      date: data.date ? new Date(data.date).toISOString() : null,
      image: data.image || "https://cdn.pixabay.com/photo/2022/07/17/13/41/sunflower-7327456_1280.jpg",
    };
    
    setEvents((prev) => [...prev, newEvent]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialState({ 
      title: "", 
      description: "", 
      date: null, 
      community: "", 
      guestCount: "", 
      address: "" ,
      coordinates:""
    });
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
        <SidebarItems setOpen={setOpen} />
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
        
        {/* Ana sayfada EventForm göster, diğer sayfalarda Outlet */}
        {isHomePage ? (
          <EventForm 
            events={events}
            setEvents={setEvents}
            setOpen={setOpen}
            setInitialState={setInitialState}
          />
        ) : (
          <Outlet />
        )}
      </Box>

      {/* === EventForm Modal === */}
      <Dialog
        open={open}
        onClose={handleClose}
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
        {open &&<AktivitätForm
          open={open}
          handleClose={handleClose}
          initialState={initialState}
          onSubmit={handleEventSubmit}
        />}
      </Dialog>
    </Box>
  );
};

export default Dashboard;