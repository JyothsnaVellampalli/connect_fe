import React from 'react';
import {Box,Typography} from '@mui/material';

function Friends({follower}) {
    console.log(follower);
  return (
    <Box  sx={{display: 'flex', flexDirection: 'row',
    p: 0.5,
     m: 0.5,
   bgcolor: 'background.paper'}}>
    <img src={follower.profilePicture} alt='friends' height='70' width='70' style={{border:'1px solid white', borderRadius:'5px'}}/>
    <Typography variant='subtitle1' style={{margin:'auto'}}>{follower.username}</Typography>
    </Box>
  )
}

export default Friends
