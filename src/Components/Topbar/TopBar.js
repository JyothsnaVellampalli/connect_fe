import React,{useContext} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Badge, Avatar } from '@mui/material';
import LogoImg from '../../Assests/profiles/connect.jpg';
import Img from '../../Assests/profiles/images (4).jpg'
import {Link} from 'react-router-dom';
import {UserContext} from '../../App';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../../Context/AuthContext';

function TopBar() {
  const {user} = useContext(AuthContext);
  // console.log(user);
  return (
  <>
  <nav class="navbar navbar-expand-lg navbar-light bg-success p-2 text-dark bg-opacity-50">
  <div class="container-fluid">
    <Link to='/'>
    <Avatar alt="Remy Sharp" src={LogoImg} sx={{marginRight:'10px'}} />
    </Link>
    <a class="navbar-brand" href="/">Connect</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" >
          <Link to='/' style={{textDecoration: 'none'}}>
          <a class="nav-link active" aria-current="page">Home</a>
          </Link>
        </li>
        {/* <li class="nav-item">
          <a class="nav-link active" href="#">Timeline</a>
        </li> */}
        
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-secondary" type="submit"><SearchIcon/></button>
        
      </form>
      <Badge badgeContent={2} color="primary" style={{marginLeft:'10px'}}>
          <IconButton><MessageIcon/></IconButton>
      </Badge>
      <Badge badgeContent={2} color="primary">
          <IconButton><NotificationsIcon/></IconButton>
      </Badge>
      <Badge badgeContent={2} color="primary">
          <IconButton><PersonIcon/></IconButton>
      </Badge>
      <Link to={`/profile/${user.username}`}>
      <Avatar alt="Remy Sharp" src={user.profilePicture} sx={{marginLeft:'10px'}} />
      </Link>
      
      
      
    </div>
  </div>
</nav>
  
</>
  )
}

export default TopBar
