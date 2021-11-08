import { Button, Box, Typography, Container, IconButton } from "@mui/material";
import LogoIcon from '../images/logo';
import React, { useContext } from "react";
import { AuthContext } from "../lib/authProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "@reach/router";

interface HeaderProps {
}
 
const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <Container
      sx={{marginBottom: 4}}
    >
      <Box
        display='flex'
        justifyContent='space-between'
      >
        <IconButton
          edge='start'
          sx={{
            backgroundColor: '#ffffff',
            padding: 2.5,
          }}
          color='inherit'
          aria-label='home'
          onClick={() => navigate('/welcome')}
        >
          <LogoIcon sx={{ height: '36px', width: '36px' }}/>
        </IconButton>
        {isAuthenticated
          ? (
            <Button onClick={() => logout({ returnTo: window.location.origin })}>
              <Typography>Logout</Typography>
            </Button>
          ) : (
            <Button onClick={() => loginWithRedirect()}>
              <Typography>Login</Typography>
            </Button>
          )  
        }
      </Box>
    </Container>
  );
}
 
export default Header;
