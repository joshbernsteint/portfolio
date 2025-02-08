import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider, createTheme, getContrastRatio} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const wNull = '#696969';
const wEx = "#b59f3b";
const wPerf = '#6cab64';


const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
    light: false,
  },
  palette: {
    w_null: {
      main: wNull,
      light: wNull,
      dark: wNull,
      contrastText: getContrastRatio(wNull, '#fff') > 4.5 ? '#fff' : '#111',
    },
    w_ex: {
      main: wEx,
      light: wEx,
      dark: wEx,
      contrastText: getContrastRatio(wEx, '#fff') > 4.5 ? '#fff' : '#111',
    },
    w_perf: {
      main: wPerf,
      light: wPerf,
      dark: wPerf,
      contrastText: getContrastRatio(wPerf, '#fff') > 4.5 ? '#fff' : '#111',
    },
  }
} as any);


createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme} defaultMode='dark'>
    <CssBaseline />
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
)
