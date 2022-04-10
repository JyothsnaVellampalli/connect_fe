import React,{useContext,useRef, useState} from 'react';
import Img from '../../Assests/profiles/images (4).jpg';
import {Box,Typography,Card,Divider,Avatar, Button} from '@mui/material';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {UserContext} from '../../App';
import axios from 'axios';
import {AuthContext} from '../../Context/AuthContext';

function Share() {
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file,setFile] = useState();
  const handlePost = async(e)=>{
    e.preventDefault();
    const newpost = {userId : user.token, description : desc.current.value} ;
    if(file){
      const data = new FormData();
      // const fileName = (Date.now()+file.name).toString();
      data.append('file',file);
      const fileName = file.name;
      // data.append('name',fileName);
      newpost.image ='http://localhost:4000/images/'+fileName;
      //to upload image to (server).
      try{
        let response = await axios.post('http://localhost:4000/upload', data);
      }catch(err){console.log(err);}
    }

    let response = await axios.post('http://localhost:4000/posts',newpost);
    console.log(response.data);
    if(response.data.status == 200){window.location.reload();}
  }

  return (
    <div style={{margin:'30px'}}>
      <Card sx={{padding:'20px'}}>
        <Box sx={{display:'flex', flexDirection:'row'}}>
          <Avatar alt="Remy Sharp" src={user.profilePicture} /> 
          <input placeholder={"What's in your mind " + user.username + "?"} 
          ref={desc}
          style={{marginLeft:'10px',border:'none',focus:{border:'none'}}} />
          </Box>
        
        {file && (
          <div>
            
            <img src={URL.createObjectURL(file)} alt="" style={{height:'200px',width:'350px'}} />
            <CancelIcon onClick={() => setFile(null)} style={{marginBottom:'200px'}} />
          </div>)}


        <Divider style={{marginTop:'10px'}}/>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:"space-between",marginTop:'10px'}}>
        <label htmlFor='file'>
            <PhotoSizeSelectActualIcon sx={{color :'red'}}/> 
            Photos and Videos
            <input type='file' id='file' accept='.png,.jpg,.jpeg'
            style={{display:'none'}}
            onChange={(e)=>setFile(e.target.files[0])} 
             />
            </label>
            
            <Button><EmojiEmotionsIcon sx={{color :'#ffc400'}}/> Feelings</Button>
            <Button><LocationOnIcon sx={{color :'green'}}/> Location</Button>
            <Button variant="contained" size="small" onClick={handlePost} >Share</Button>
        </Box>

      </Card>
    </div>
  )
}

export default Share
