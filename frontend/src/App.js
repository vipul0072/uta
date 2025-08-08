import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import LandingPage from './Components/LandingPage';
import RegistrationPage1 from './Components/RegistrationPage1';
import RegistrationPage2 from './Components/RegistrationPage2';
import UserLogin from './Components/UserLogin';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import Page404 from './Components/Page404';
import UserDetail from './Components/UserDetail';
import Navbar from './Components/Navbar';
import UpdateDetails from './Components/UpdateDetails';
import SuccessPage from './Components/SuccessPage';
import UserPrivateComponent from './Components/UserPrivateComponent';
import AdminPrivateComponent from './Components/AdminPrivateComponent';

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>


          <Route element={<UserPrivateComponent/>}>
            <Route path='/user-details/:playerId' element={<UserDetail/>}></Route>
            <Route path='/update-details/:playerId' element={<UpdateDetails/>}></Route>
          </Route>

          <Route element={<AdminPrivateComponent/>}>
            <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
          </Route>


          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/register' element={<RegistrationPage1/>}></Route>
          <Route path='/register-page2/:playerId' element={<RegistrationPage2/>}></Route>
          <Route path='/user-login' element={<UserLogin/>}></Route>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/success' element={<SuccessPage/>}></Route>
          <Route path='*' element={<Page404/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
