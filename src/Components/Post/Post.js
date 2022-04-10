import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import CImg from '../../Assests/profiles/defaultCover.png';
import PImg from '../../Assests/profiles/defaultProfile.png';
import {Avatar, Card, Typography, CardMedia, CardContent, IconButton, CardHeader, CardActions, Badge} from '@mui/material';
import PostImg from '../../Assests/posts/download (2).jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import {format} from 'timeago.js';
import {AuthContext} from '../../Context/AuthContext';

function Post({post}) {
  const {user} = useContext(AuthContext);
  // console.log(user);
    // console.log(post);
    const [likes,setLikes] = useState(post.likes.length);
    const [thumbsup,setThumbsup] = useState(post.thumsup.length);
    const [comments,setComments] = useState(post.comments.length);
    const [isLiked,setIsLiked] = useState(false);
    const [postuser,setPostuser] = useState({})

    const fetchpostuser = async()=>{
      const response = await axios.get(`http://localhost:4000/users?id=${post.userId}`);
      setPostuser(response.data.data);
      // console.log(response.data.data);
    }
    useEffect(()=>{
      fetchpostuser();
    },[post.userId])
    
    const thumbsupHandler = ()=>{
      let count = thumbsup;
      count++
      setThumbsup(count);
        
    }

    const likesHandler = async(postId)=>{
      console.log(postId);
      const response = await axios.put(`http://localhost:4000/posts/${postId}/like`,{userId: user.token})
      console.log(response.data);
      setLikes(isLiked ? likes-1 : likes+1);
        setIsLiked(!isLiked);
    }
    console.log(postuser);
    console.log(user);

    const handleComment = (postId)=>{

    }

  return (
    <div style={{margin:'10px'}}>
        <Card style={{margin:'10px', marginBottom:'15px'}}>
        <CardHeader
        avatar={ <Avatar aria-label="profile" src={postuser.profilePicture || PImg} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postuser.username}
        subheader={format(post.createdAt)}
      />

      <CardContent>
          <Typography variant='body1'>{post.description}</Typography>
      </CardContent>

      <CardMedia component="img" image={post.image} alt="Post" sx={{border:'15px solid white'}}/>

      <CardActions sx={{marginTop:'5px'}}>

      <Badge badgeContent={likes} color='primary'>
        <Avatar sx={{bgcolor:'#e53935'}}>
        <IconButton aria-label="add to favorites" onClick={()=>likesHandler(post.postId)}>
        <FavoriteIcon sx={{color:'white'}} />
        </IconButton>
        </Avatar>
        </Badge>

        <Badge badgeContent={thumbsup} color='primary'  onClick={thumbsupHandler}>
        <Avatar sx={{bgcolor:'#3949ab'}}>
        <IconButton aria-label="Thumbs up">
          <ThumbUpAltIcon sx={{color:'white'}}/>
        </IconButton>
        </Avatar>
        </Badge>
      
        <Badge badgeContent={comments} color='primary'  onClick={()=>{handleComment(post.postId)}} >
      <Avatar sx={{bgcolor:'#9fa8da'}}>
        <IconButton aria-label="comment">
          <InsertCommentIcon sx={{color:'white'}}/>
        </IconButton>
        </Avatar>
        </Badge>

        {/* <Avatar sx={{bgcolor:'#388e3c', marginLeft:'10px'}}>
        <IconButton aria-label="share">
          <ShareIcon sx={{color:'white'}}/>
        </IconButton>
        </Avatar> */}

      </CardActions>
      
        <Typography sx={{marginLeft:'10px'}}>{comments} comments & {likes} people liked it</Typography>
          
      </Card>
    </div>
  )
}

export default Post
