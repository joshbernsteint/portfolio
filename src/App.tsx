import './App.css'
import { useColorScheme } from '@mui/material'
import BasePage from './pages/Base';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#15181a'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BasePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
