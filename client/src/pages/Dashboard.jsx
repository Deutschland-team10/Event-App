import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useNavigate } from "react-router-dom";
import MenüListItem from "../components/MenüListItem";
import {
    Avatar,
    Badge,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useAuthCall from "../hook/useAuthCall";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Dashboard = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { logout } = useAuthCall();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1300,
                    background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => navigate("/home")}
                        sx={{ cursor: "pointer" }}
                    >
                        ZusammenFun
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon onClick={() => navigate("/home/chat-page")} />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={9} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <Tooltip title={currentUser.username}>
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar
                                    src={currentUser.image || ""}
                                    sx={{ width: 30, height: 30 }} />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem>
                                <Button
                                    onClick={() => navigate("/home/profile")}
                                    color="inherit"
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "secondary.main",
                                            color: "white",
                                            "& .MuiSvgIcon-root": {
                                                color: "red",
                                            },
                                        },
                                        ".MuiSvgIcon-root": {
                                            ml: 1,
                                        },
                                        textAlign: "center",
                                    }}
                                >
                                    PROFİLE
                                </Button>
                            </MenuItem>

                            <MenuItem>
                                <Button
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "secondary.main",
                                            color: "white",
                                            "& .MuiSvgIcon-root": {
                                                color: "red",
                                            },
                                        },
                                        color: "inherit",
                                        ".MuiSvgIcon-root": {
                                            ml: 1,
                                        },
                                    }}
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        navigate("/home/my-events");
                                    }}
                                >
                                    My Events
                                </Button>
                            </MenuItem>

                            <MenuItem>
                                <Button
                                    color="inherit"
                                    onClick={() => logout()}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "secondary.main",
                                            color: "white",
                                            "& .MuiSvgIcon-root": {
                                                color: "red",
                                            },
                                        },
                                        ".MuiSvgIcon-root": {
                                            ml: 1,
                                        },
                                    }}
                                >
                                    Logout <LogoutIcon />
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        background: "linear-gradient(180deg, #667EEA 0%, #764BA2 100%)",
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
};

export default Dashboard;
