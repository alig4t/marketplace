import {  Route, Routes } from 'react-router-dom';

import Main from './pages/Main/Main';
import SelectCity from './pages/SelectCity/SelectCity';
import NotFoundPage from './pages/404/NotFoundPage';

import './App.css';


function App() {
  return (
        <Routes>
          <Route path='/' element={<SelectCity />} />
          <Route path='/s/:city/:cat?' element={<Main />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/s' element={<NotFoundPage />} />
        </Routes>
  );
}

export default App;
