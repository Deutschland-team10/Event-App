import React, { useState } from "react";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EventForm from "../components/EventForm";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  //const navigate = useNavigate();
  const [showEventForm, setShowEventForm] = useState(false);

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/about")}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setShowEventForm(true)}>
              <ListItemIcon><ContactPageIcon /></ListItemIcon>
              <ListItemText primary="Etkinlik Oluştur" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Etkinlik Oluştur Formu */}
      <Dialog open={showEventForm} onClose={() => setShowEventForm(false)} fullWidth maxWidth="md">
        <DialogTitle>Etkinlik Oluştur</DialogTitle>
        <DialogContent>
          <EventForm onClose={() => setShowEventForm(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
// kazim's branch