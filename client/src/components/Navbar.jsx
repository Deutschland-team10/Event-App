import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Badge,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Button,
  CssBaseline
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import useAuthCall from "../hook/useAuthCall";

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuthCall();


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Çıkış işlemleri
    handleCloseUserMenu();
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1300 ,background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",}}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" onClick={() => navigate("/home")} sx={{ cursor: "pointer" }}>
            Event Logo
          </Typography>


          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.15)",
              px: 2,
              borderRadius: 1,
              minWidth: 200
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Suchen…"
              sx={{ ml: 1, color: "white", flex: 1 }}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={9} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Tooltip title="Ayarlar">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Button onClick={() => navigate("/home/profile")}
               color="inherit"
               sx={{
               "&:hover": {
                backgroundColor: "secondary.main",
                color:"white",
                "& .MuiSvgIcon-root":{
                  color:"red"
                 }
                },
               ".MuiSvgIcon-root":{
               ml:1
               }

               }}
              >
               PROFİLE
              </Button>
              <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/home/account"); }}>
               Hesap
              </MenuItem>
              <Button
               color="inherit"
               onClick={()=> logout()}
               sx={{
               "&:hover": {
                backgroundColor: "secondary.main",
                color:"white",
                "& .MuiSvgIcon-root":{
                  color:"red"
                 }
                },
               ".MuiSvgIcon-root":{
               ml:1
               }

               }}
               >
               Logout <LogoutIcon/>
              </Button>
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
