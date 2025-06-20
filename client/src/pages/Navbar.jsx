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

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  //const navigate = useNavigate();

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
      <AppBar position="fixed" color="primary" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Dashboard
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
              placeholder="Ara…"
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
              <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/profile"); }}>
                Profil
              </MenuItem>
              <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/account"); }}>
                Hesap
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Çıkış Yap
              </MenuItem>
            </Menu>

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
