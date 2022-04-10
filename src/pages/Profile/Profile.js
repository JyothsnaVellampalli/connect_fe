import React,{useContext,useState,useEffect} from 'react';
import CoverImg from '../../Assests/profiles/defaultCover.png';
import ProfileImg from '../../Assests/profiles/defaultProfile.png'
import TopBar from '../../Components/Topbar/TopBar';
import SideBar from '../../Components/SideBar/SideBar';
import RightBar from '../../Components/RightBar/RightBar';
import Feed from '../../Components/Feed/Feed';
import { Grid, Typography} from '@mui/material';
import {UserContext} from '../../App';
import {useParams} from 'react-router';
import axios from 'axios';
import {AuthContext} from '../../Context/AuthContext';


function Profile() {
    const username = useParams().username;
    console.log({username});
    const [userprofile,setUserprofile] = useState({});

    const fetchuserprofile = async (username)=>{
        const response = await axios.get(`http://localhost:4000/users?username=${username}`);
        setUserprofile(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if(username){
            console.log('yess');
        fetchuserprofile(username);
    }
    },[username])

  return (
    <div>
        <TopBar/>
        <Grid container>
            <Grid item xs={12} sm={2}>
            <SideBar/>
            </Grid>
            <Grid item xs={12} sm={10}>
                <ProfilePage userprofile={userprofile}/>

                <Grid container>
                    <Grid item xs={12} sm={8}>
                    <Feed username={username}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <RightBar userprofile={userprofile}/>
                    </Grid>  
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

const ProfilePage = ({userprofile})=>{
    console.log({userprofile});
    const {user} = useContext(AuthContext);
    return(
        <>
        <img src={userprofile.coverPicture ? userprofile.coverPicture : CoverImg} alt="Profile Page"  width="100%" height="300px"/>

        <img src={userprofile.profilePicture ? userprofile.profilePicture : ProfileImg} alt="Profile Page" 
        style={{width:'160px', 
        height:'160px',
        borderRadius:'50%', 
        marginTop:'-150px',
        marginLeft:'40%',
        border:'2px solid white'}}/>

        <Typography variant='h5' sx={{textAlign: 'center',marginLeft:'-3%'}}><strong>{userprofile.username}</strong></Typography>
        <Typography variant='subtitle1' sx={{textAlign: 'center'}}>
            {userprofile.description ? userprofile.description : 'Hello! My Friends'}</Typography>
        </>
    )

}

export default Profile
