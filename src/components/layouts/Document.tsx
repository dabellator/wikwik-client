import { Box, Container } from "@mui/material";
import React from "react";
import Header from "../Header";

import headImage from '../../images/wikwik-header.png';
import bgImage from '../../images/wikwik-background.png';

interface DocumentLayoutProps {
  skeleton?: boolean
}
 
const DocumentLayout: React.FC<DocumentLayoutProps> = ({
  skeleton = false,
  children,
}) => {
  return (
    <Box sx={{
      backgroundColor: '#FCC3A3',
      height: '60px',
    }}>
      <Header />
      <Container maxWidth='md'>
        {skeleton
          ? (
            <div>nothing here</div>
          )
          : children
        }
      </Container>
      <Box sx={{
        backgroundColor: '#F09F9C',
        height: '10px',
        position: 'fixed',
        bottom: '20px',
        width: '100%',
      }} />
      <Box sx={{
        backgroundColor: '#C76B98',
        height: '10px',
        position: 'fixed',
        bottom: '10px',
        width: '100%',
      }} />
      <Box sx={{
        backgroundColor: '#632B6C',
        height: '10px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }} />
    </Box>
  );
}
 
export default DocumentLayout;
