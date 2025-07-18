// pages/Dashboard.jsx
import React, { useState } from "react";
import { Drawer, Toolbar, Box, Dialog } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import MenüListItem from "../components/MenüListItem";

const drawerWidth = 240;

const Dashboard = () => {
  const [Open, setOpen] =useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      {/* === Sidebar === */}
      <Drawer
        variant="permanent"
        anchor="left"
        open={Open}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
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
        <MenüListItem/>
      </Drawer>

      {/* === Ana İçerik === */}
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)`} 
        }}
      >
        <Toolbar />
          <Outlet />
      </Box>

      {/* === EventForm Modal === */}
      
    </Box>
  );
};

export default Dashboard;