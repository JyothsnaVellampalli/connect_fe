import React, { useEffect, useState, useContext } from 'react';
import Share from '../../Components/Share/Share';
import Post from '../Post/Post';
import axios from 'axios';
import {UserContext} from '../../App';
import {AuthContext} from '../../Context/AuthContext';

function Feed({username}) {
  
  console.log({username})
    const {user} = useContext(AuthContext);
    const {posts} = useContext(UserContext);

    const [userposts, setUserPosts] = useState([]);
    //for profile page
    const fetchuserposts =async(username)=>{
        const response = await axios.get(`http://localhost:4000/posts/profile/${username}`);
        setUserPosts(
          response.data.posts.sort((p1,p2)=>{return new Date(p2.createdAt) - new Date(p1.createdAt)})
          );
        console.log(response.data.posts);
      }

      useEffect(()=>{
          if(username){
          console.log(username);
          fetchuserposts(username);
          }
        },[username])

    function Homefeed(){
    return (
    <div>
      <Share/>
      {
      posts.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
    </div>
  )
}

  function Profilefeed(){
    return(
      <div>
      {
      userposts.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
    </div>

    )
  }

  return(
    <div>
      {username ? <Profilefeed/> : <Homefeed/>}
    </div>
  )

}

export default Feed
