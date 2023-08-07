import React, {useState} from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon,Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import profileImage from "../assets/profile.jpg";
import { useTheme } from '@emotion/react';
import { AppBar, Button, IconButton, InputBase, Toolbar, Box, Typography, Menu, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
const Navbar = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        localStorage.clear();
        navigate('/');
    };
  return (
    <AppBar
    sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
    }}
    >
        <Toolbar sx={{justifyContent:"space-between"}}>
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
                <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
                >
                    <InputBase placeholder='Search...'/>
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap="1.5rem">
                
                <FlexBetween>
                    <Button onclick={handleClick}
                    sx={{
                        display:"flex", 
                        justifyContent:"space-between", 
                        alignItems: "center", 
                        textTransform: "none", 
                        gap: "1rem"}}
                    >
                        <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.role}
                </Typography>
              </Box>
                    </Button>
                    <Button sx={{backgroundColor: theme.palette.primary[500]}} onClick={handleClose}>Log Out</Button>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;