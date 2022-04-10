
import './App.css';
import React, {useState, useEffect, useContext} from 'react';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from './Context/AuthContext';

export const UserContext=React.createContext();

function App() {

  const { user } = useContext(AuthContext);
  console.log(user,'app');
  const [posts,setPosts] = useState([]);
  
  const fetchuser = async(id)=>{
    console.log(id);
    const response = await axios.get(`http://localhost:4000/users?id=${id}`);
    console.log(response.data.data);
    return response.data.data;
  }

  const fetchtimelineposts = async(id)=>{
    const response = await axios.get(`http://localhost:4000/posts/timeline/${id}`);
    setPosts(
      response.data.timeline.sort((p1,p2)=>{return new Date(p2.createdAt) - new Date(p1.createdAt)})
      );
    console.log(response.data);
  }
  
  useEffect(()=>{
    if(user!=null){
      console.log(user);
    fetchtimelineposts(user.token);
  }
  },[user])
  console.log(user,'userapp');

  return (
    <>
    <BrowserRouter>
    <UserContext.Provider value ={{posts}} >
    <Routes>
      <Route path='/' element={user ? <Home/> : <Login/>}/>
      <Route  path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
      <Route path='/register' element={user ? <Navigate to='/'/> : <Register/>}/>
      <Route path='/profile/:username' element={<Profile/>}/>
    </Routes>
    </UserContext.Provider>
    </BrowserRouter>
    
    </>
  );
}

export default App;
