import './App.css'
import BasePage from './pages/Base';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#15181a'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BasePage />}/>
          <Route path='/t' element={<>yo</>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
