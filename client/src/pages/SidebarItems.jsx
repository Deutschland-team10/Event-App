import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useNavigate } from "react-router-dom";

const SidebarItems = ({ setShowEventForm }) => {
  const navigate = useNavigate();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => navigate("/")}
          sx={{
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            color: 'white',
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Ana Sayfa" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => navigate("/about")}
          sx={{
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            color: 'white',
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Hakkımızda" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setShowEventForm(true)}
          sx={{
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            color: 'white',
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <ContactPageIcon />
          </ListItemIcon>
          <ListItemText primary="Etkinlik Oluştur" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarItems;
