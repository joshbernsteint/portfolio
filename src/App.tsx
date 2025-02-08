import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';

// Resume
import ResizableBasePage from './pages/Resizer.tsx';
import Wordle from './pages/games/wordle/Wordle.tsx';
import Navbar from './components/navbar/Navbar.tsx';
import Requester from './pages/tools/requester/Requester.tsx';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#15181a'}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ResizableBasePage />}/>
          <Route path='tools' element={<><Outlet/></>}>
            <Route path='requester' element={<Requester />} />
          </Route>
          <Route path='/games' element={<><Outlet /></>}>
            <Route path='wordle' element={<Wordle />} />
          </Route>
          <Route path='/resume' element={
            <embed src={'./JoshuaBernstein_Resume.pdf'}
              type='application/pdf'
              height={'100%'}
              width={'100%'}
            />
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
