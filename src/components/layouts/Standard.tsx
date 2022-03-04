import { Box, Container } from "@mui/material";
import React from "react";
import Header from "../Header";

import headImage from '../../images/wikwik-header.png';
import bgImage from '../../images/wikwik-background.png';

interface StandardLayoutProps {
  skeleton?: boolean
}
 
const StandardLayout: React.FC<StandardLayoutProps> = ({
  skeleton = false,
  children,
}) => {
  return (
    <Box sx={{
      backgroundImage: `url(${headImage})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }}>
      <Box sx={{
        height: '100vh',
        backgroundAttachment: 'fixed',
        backgroundPosition: '0% 100%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}>
        <Header />
        <Container maxWidth='md'>
          {skeleton
            ? (
              <div>Loading...</div>
            )
            : children
          }
        </Container>
      </Box>
    </Box>
  );
}
 
export default StandardLayout;
