import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';

// Resume
import resume from './assets/JoshuaBernstein_Resume.pdf';
import ResizableBasePage from './pages/Resizer.tsx';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#15181a'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ResizableBasePage />}/>
          <Route path='/resume' element={
            <embed src={resume}
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
