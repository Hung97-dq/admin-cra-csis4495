import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetUserQuery } from "../../state/api";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [localStorageItem, setlocalStorageItem] = useState(JSON.parse(localStorage.getItem('profile')));
  const userId = localStorageItem?.loggedIn?.user?._id;
  console.log("userid", userId);
  const { data } = useGetUserQuery(userId);
  console.log('data',data);

  if (data?._id) {
    navigate('/dashboard')
  }
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="secondary">
          CRA Admin Page
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome Admin!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;