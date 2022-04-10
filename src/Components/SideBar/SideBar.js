import React,{useContext, useState, useEffect} from 'react';
import {Box, List,ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Avatar} from '@mui/material';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import HelpIcon from '@mui/icons-material/Help';
import SchoolIcon from '@mui/icons-material/School';
import Img from '../../Assests/profiles/images (2).jpg';
import {AuthContext} from '../../Context/AuthContext';
import axios from 'axios';
import Friends from '../Friends';

function SideBar() {
  const {user} = useContext(AuthContext);
  const [followers,setFollowers] = useState([])

  const fetchFollowers = async(id)=>{
    let response = await axios.get(`http://localhost:4000/users/followers/${id}`)
    console.log(response.data);
    setFollowers(response.data.data);
  }

  useEffect(()=>{
    if(user){
    fetchFollowers(user.token)}
  },[user])

  return (
    <div style={{overflowY : 'scroll'}}>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <RssFeedIcon />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VideoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarksIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon/>
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon/>
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon/>
              </ListItemIcon>
              <ListItemText primary="Education" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      {/* <Divider /> */}
      {/* <Typography variant="h5" sx={{margin:'5px'}}>Friends</Typography>
        {followers.map((follower)=>{<Friends key={follower.username} follower={follower}/>})  } */}
    </Box>
    </div>
  )


// function FollowersList({followers}){
//   console.log(followers,'followers')

//   {followers.map((following,i)=>{
//     console.log(following);
//     return(
//     <Box key={i} sx={{display: 'flex', flexDirection: 'row',
//     p: 0.5,
//      m: 0.5,
//    bgcolor: 'background.paper'}}>
//     <img src={following.profilePicture} alt='friends' height='70' width='70' style={{border:'1px solid white', borderRadius:'5px'}}/>
//     <Typography variant='subtitle1' style={{margin:'auto'}}>{following.username}</Typography>
//     </Box>
//     )
//   }) } 

// }

}

export default SideBar
