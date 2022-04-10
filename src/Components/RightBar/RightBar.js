import React,{useContext, useEffect, useState} from 'react';
import birthday from '../../Assests/profiles/birthday.png';
import celebrations from '../../Assests/profiles/celebrate.jpg';
import {Typography, Box, Avatar, Divider, Button} from '@mui/material';
import profileImg from '../../Assests/profiles/images (5).jpg';
import friendImg from '../../Assests/profiles/images (7).jpg';
import { UserContext } from '../../App';
import axios from 'axios';
import {AuthContext} from '../../Context/AuthContext';

export default function RightBar({userprofile}){

  console.log(userprofile,'rightbar');
const {user} = useContext(AuthContext);

  const onlineUsers = [
    {id:'1',username:'',img:''},
    {id:'2',username:'',img:''},
    {id:'3',username:'',img:''},    {id:'4',username:'',img:''}
  ];

function HomeRightBar() {
  
  return (
    <div style={{marginTop: '10px'}}>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <img src={birthday} alt='birthday' height="40px" width="40px"/>
      <Typography variant='body1' style={{margin: '12px'}}><strong>John</strong> and <strong>2 other friends</strong> have a birthday today.</Typography>
      </Box>
      <img src={celebrations} alt='birthday' height='280' width="400" style={{borderRadius:'5px', borderShadow: '2px 2px 4px 4px'}} />
      <Divider />
      <Typography variant="h6" sx={{margin:'5px'}}>Friends Online</Typography>

      {onlineUsers.map((user)=>{
        return(
          <Box sx={{display: 'flex', flexDirection: 'row', p: 1, m: 1, 
          bgcolor: 'background.paper', borderRadius: 1 }}>
        <Avatar alt="Remy Sharp" src={profileImg} />
        <div style={{width:'10px',height:'10px',borderRadius:'50%',backgroundColor:'limegreen',position:'absolute',marginLeft:'25px'}} />
        <Typography variant='body1' sx={{margin : '6px'}}>John</Typography>
        </Box>
      )
      })}
    </div>
    )
}

function ProfileRightBar({userprofile}){

  const [followings,setFollowings] = useState([])
  const [followers,setFollowers] = useState([])

  const fetchFollowings = async(id)=>{
    let response = await axios.get(`http://localhost:4000/users/followings/${id}`)
    console.log(response.data);
    setFollowings(response.data.data);
  }

  const fetchFollowers = async(id)=>{
    let response = await axios.get(`http://localhost:4000/users/followers/${id}`)
    console.log(response.data);
    setFollowers(response.data.data);
  }

  useEffect(()=>{
    fetchFollowings(userprofile.token);
    fetchFollowers(userprofile.token)
  },[userprofile])

  const Unfollow = async(id)=>{
      let response = await axios.put(`http://localhost:4000/users/${id}/unfollow`,{userId : userprofile.token});
      console.log(response.data);
  }

  const Follow = async(id)=>{
    let response = await axios.put(`http://localhost:4000/users/${id}/follow`,{userId : userprofile.token});
    console.log(response.data);
}
 

  return(
    <div style={{marginTop: '30px'}}>
    <Typography variant='h5' gutterBottom>User Info :</Typography>
    <Typography variant='body1' gutterBottom>City : {userprofile.city ? userprofile.city : 'Hyderabad'}</Typography>
    <Typography variant='body1' gutterBottom>RelationshipStatus : Single</Typography>
    <Divider/>
    <Typography variant='h5'sx={{marginTop:'10px', color:'#00796b'}}>People You Follow</Typography>
    <Box sx={{display: 'flex', flexDirection: 'row',flexWrap: 'wrap'}}> 
    {followings.map((following,i)=>{
      console.log(following);
      return(
      <Box key={i} sx={{display: 'flex', flexDirection: 'column',
      p: 0.5,
       m: 0.5,
     bgcolor: 'background.paper'}}>
      <img src={following.profilePicture} alt='friends' height='70' width='70' style={{border:'1px solid white', borderRadius:'5px'}}/>
      <Typography variant='subtitle1' style={{margin:'auto'}}>{following.username}</Typography>
      <Button size="small" variant='outlined' onClick={()=>Unfollow(following.token)}>UnFollow </Button>
      </Box>
      )
    }) } 
    </Box> 



    <Typography variant='h5'sx={{marginTop:'10px', color:'#00796b'}}>Your Followers</Typography>
    <Box sx={{display: 'flex', flexDirection: 'row',flexWrap: 'wrap'}}> 
    {followers.map((following,i)=>{
      console.log(following);
      return(
      <Box key={i} sx={{display: 'flex', flexDirection: 'column',
      p: 0.5,
       m: 0.5,
     bgcolor: 'background.paper'}}>
      <img src={following.profilePicture} alt='friends' height='70' width='70' style={{border:'1px solid white', borderRadius:'5px'}}/>
      <Typography variant='subtitle1' style={{margin:'auto'}}>{following.username}</Typography>
      <Button size="small" variant='outlined' onClick={()=>Follow(following.token)}>Follow </Button>
      </Box>
      )
    }) } 
    </Box> 
    
    </div> 
  )
}

return(
  <div>
    {userprofile ? <ProfileRightBar userprofile={userprofile}/> : <HomeRightBar/>}
  </div>
)

}
