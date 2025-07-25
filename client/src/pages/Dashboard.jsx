import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, useNavigate } from 'react-router-dom';
import MenüListItem from '../components/MenüListItem';
import { Avatar, Badge, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import NotificationsIcon from "@mui/icons-material/Notifications";
import useAuthCall from '../hook/useAuthCall';
import { useState } from 'react';
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Dashboard = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuthCall();
  
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1300, background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)", }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" onClick={() => navigate("/home")} sx={{ cursor: "pointer" }}>
            Event Logo
          </Typography>


         

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
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      color: "red"
                    }
                  },
                  ".MuiSvgIcon-root": {
                    ml: 1
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
                onClick={() => logout()}
                sx={{
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      color: "red"
                    }
                  },
                  ".MuiSvgIcon-root": {
                    ml: 1
                  }

                }}
              >
                Logout <LogoutIcon />
              </Button>
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: "linear-gradient(180deg, #667EEA 0%, #764BA2 100%)"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <MenüListItem />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "'background.default'", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}



export default Dashboard;