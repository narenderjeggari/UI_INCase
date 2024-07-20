import React, { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { clearSession } from "../../utils/cookies";
import { Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import JwtTokenHandler from "../jwtTokenHandler/JwtTokenHandler";

const drawerWidth = 240;

function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        clearSession();
        window.close();
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItems = [
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Reminders', path: '/reminders' },
        { text: 'Work Schedule', path: '/work-schedule' },
        { text: 'Preferences', path: '/preferences' }
    ];

    return (
        <>
            <Box
                boxSizing="border-box"
                height={{ xs: "45px" }}
                sx={{
                    backgroundColor: "#183084",
                    position: "fixed",
                    zIndex: "999",
                    top: 0,
                }}
                width="100%"
                alignItems="center"
            >
                <Stack direction="row" justifyContent={"space-between"} alignItems={'center'} height={'inherit'}>
                    <Stack
                        direction="row"
                        marginLeft={2}
                        spacing={3}
                        alignItems="center"
                        height="100%"
                    >
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ color: '#fff', mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Stack>
                            <Typography color="white" fontSize={24}>
                                RESEA
                            </Typography>
                        </Stack>
                    </Stack>
                    <IconButton
                        color="inherit"
                        onClick={handleOpenMenu}
                        style={{ padding: "0" }}
                    >
                        <Avatar
                            // {...stringAvatar(userDetails?.userName)}
                            style={{
                                width: "28px",
                                height: "28px",
                                fontSize: "0.8rem",
                                margin: "0 10px",
                            }}
                        />
                    </IconButton>
                </Stack>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <JwtTokenHandler onLogout={handleLogout} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={item.path}
                                sx={{ 
                                    backgroundColor: location.pathname === item.path ? '#e0e0e0' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
