import React,{useContext} from 'react';
import TopBar from '../../Components/Topbar/TopBar';
import SideBar from '../../Components/SideBar/SideBar';
import RightBar from '../../Components/RightBar/RightBar';
import Feed from '../../Components/Feed/Feed';
import { Grid} from '@mui/material';
import {UserContext} from '../../App';
import {AuthContext} from '../../Context/AuthContext';

function Home() {
  // if(event){
  //   event.preventDefault();
  // }
  const {posts} = useContext(UserContext);
  const {user} = useContext(AuthContext)
  return<>
  <TopBar/>
    <Grid container>
      <Grid item xs={12} sm={2}>
        <SideBar/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Feed/>
      </Grid>
      <Grid item xs={12} sm={4}>
        <RightBar/>
      </Grid>

    </Grid>
  </>
}

export default Home
