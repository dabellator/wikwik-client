import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';

const GeomanistWoff = './fonts/geomanist-regular-webfont.woff2'
const GeomanistEot = './fonts/geomanist-regular-webfont.eot'
const GeomanistTtf = './fonts/geomanist-regular-webfont.ttf'
const GeomanistSvg = './fonts/geomanist-regular-webfont.svg'

const theme = createTheme({
  typography: {
    fontFamily: 'Geomanist',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Geomanist';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('${GeomanistTtf}') format('ttf');
        }
      `,
    },
  },
});
 
const themeWrapper: React.FC = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
 
export default themeWrapper;