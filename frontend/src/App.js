import React from "react";
import { Route, Routes } from 'react-router-dom';
import LogIn from "./components/LogIn/LogIn";
import MainPage from "./components/MainPage/MainPage";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostForm from "./components/PostForm/PostForm";
import MapApi from "./components/Map/Map";
import Profile from "./components/Profile/Profile";

const App = () => {
  const clientId = '320695691819-62aumhislhpbkprqjhephopj743v53na.apps.googleusercontent.com';

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path='/' exact element={<LogIn />}></Route>
          <Route path='/register' exact element={<Register />}></Route>
          <Route path='/mainPage/:name' element={<MainPage />}></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>
          <Route path="/post/:name" element={<PostForm />}></Route>
          <Route path="/map" element={<MapApi />} ></Route>
          <Route path='/profile/:name' element={<Profile />}></Route>
          <Route path='/error' element={<h1>The user name that you entered is not connected</h1>}></Route>
        </Routes>
      </GoogleOAuthProvider>
    </div>

  );
}

export default App;
