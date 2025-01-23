import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
    light: false,
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme} defaultMode='dark'>
    <CssBaseline />
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
)
