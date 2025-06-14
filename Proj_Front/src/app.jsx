import './app.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login';

import Register from './components/register';

import Homepage from './components/homepage';

import HomepageAdmin from './components/homepageAdmin';


function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login /> } />
          <Route path='/login' element={<Login /> } />
          <Route path='/register' element={<Register />} />
          <Route path='/register/:nome' element={<Register />} />
          <Route path='/home' element={<Homepage /> } />
          <Route path='/homeadmin' element={<HomepageAdmin /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
