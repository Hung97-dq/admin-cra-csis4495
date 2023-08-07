import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api.js";
import {Paper} from "@mui/material";
import { Navigate } from "react-router-dom";
// import CircularProgress from "@mui/material";                                                               
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [localStorageItem, setlocalStorageItem] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const userId = localStorageItem?.loggedIn?.user?._id;
  console.log("userid", userId);
  const { data } = useGetUserQuery(userId);
  console.log('data',data);

  if (!data?._id) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create loan profiles.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
      user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
        user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;