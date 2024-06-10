import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Form from "./Form";
import FlexBetween from "../../components/FlexBetween";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import { toast } from "react-toastify";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseSuccessGoogle = (response) => {
    const details = jwtDecode(response.credential);
    console.log("Google Login Success");
    console.log(details);
    axios(`${process.env.REACT_APP_Backend_URL}/auth/googlelogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        tokenId: response.credential, // passed the Google ID token
      },
    })
      .then((res) => {
        const { user, token, message } = res.data;
        dispatch(
          setLogin({
            // Pass the user and token as a payload in an object
            user: user,
            token: token,
          })
        );
        toast.success(message);
        navigate("/home");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
    console.log("Error in Google Login");
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <FlexBetween>
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Xeno Assignment
          </Typography>
        </FlexBetween>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", textAlign: "center" }}
        >
          Welcome to Xeno Community!
        </Typography>

        <Form />

        <Divider
          sx={{
            my: "1.5rem",
            borderColor: theme.palette.primary.main,
            borderWidth: 1,
          }}
        />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={isNonMobileScreens ? "50%" : "93%"}
          p="1rem"
          m="auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <GoogleOAuthProvider clientId="60100461685-hl1cu1f2bfq1i146tqgf8knn8g8o81sa.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={responseSuccessGoogle}
              onError={responseErrorGoogle}
            />
          </GoogleOAuthProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
