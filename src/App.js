

import './App.css';
// import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import Test from './components/test/Test';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ActionNav from './components/NavBar/ActionNav';
import Spin from './components/UI/Spin';
import SelectCity from './pages/SelectCity/SelectCity';
import { useEffect } from 'react';
import { CityProvider } from './Context/CityContext';

function App() {


  return (
    // 
    <>
      {/* <Spin /> */}
    
        <Routes>
          <Route path='/' element={<SelectCity />} />
          <Route path='/s/:city/:cat?' element={<Main />} />
          {/* <Route path='/' lazy={()=>import('./components/UI/Spin')} element={<Main />} /> */}
          {/* <Route path='/s' lazy={<Spin />} element={<Main />} /> */}
          <Route path='*' element={<h1>Not Found............</h1>} />
          <Route path='/s' element={<h1>Not Found............</h1>} />
        </Routes>
   
      {/* <Routes>
        <Route path='/' element={<Main />} />
        <Route path='ads' element={<ActionNav />}>
          <Route index element={<p>index</p>} />
          <Route path=":id" element={<Test />} />
        </Route>
        <Route path='*' element={<h2>Not Found</h2>} />
      </Routes> */}
      {/* // <Main /> */}
      {/* // <Test /> */}
    </>
  );
}

export default App;
