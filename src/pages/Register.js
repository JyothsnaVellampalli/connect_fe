import React, { useEffect, useState, useRef } from 'react';
import {Grid,Typography,Card,Box} from '@mui/material';
import icon from '../Assests/profiles/connect.jpg';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


function Register() {
    const navigate = useNavigate()
    const username = useRef();
    const email = useRef();
    const phone = useRef();
  const password = useRef();
  const confirm = useRef();
  const [match,setMatch] = useState();
 const [message,setMessage] = useState();

    async function handleSubmit(e){
      e.preventDefault();
      if(confirm.current.value === password.current.value){setMatch(false)}
      else{setMatch(true)}
      if(match == false){
        const user = {username : username.current.value,
          email : email.current.value, password:password.current.value};
          console.log('user',user)
          let response = await axios.post('http://localhost:4000/auth/register',user)
          console.log(response.data);
          if(response.data.status == 200){
            console.log('yes');
            setMessage('yes');
          }
        }
    }
    
    const NavigateLogin=()=>{
      navigate('/login');
    }
      
      return (
          <Grid container spacing={2}  direction="row" justifyContent="center"
          alignItems="center">
              <Grid item xs={12} sm={7} >
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <img src={icon} width="150" height="150" style={{marginBottom:'15px'}}/>
                  <div style={{marginTop:'20px'}}>
                <Typography variant='h2' sx={{color:'#00e676'}}>Connect</Typography>
                <Typography variant="h5" sx={{color:'#757575'}}>Connect to your friends and world around you</Typography>
                </div>
                </Box>
              </Grid>

              <Grid item xs={12} sm={5}>

            <Card sx={{textAlign: 'center',paddingTop:'15px',marginTop:'100px',width:'70%'}}>
            <div className="container">
        <div className="form-container">
      <h2 className="form-title">REGISTER HERE</h2>

      <form onSubmit={handleSubmit}>
      <div className='from-item'>
      <input type="text" name="username" placeholder="EnterName" 
      required
      ref={username} />
      </div>
      
      <div className='from-item'>
      <input type="email" name="email" placeholder="EnterEmail" 
      required
      ref={email}/>

      </div>
      
      <div className='from-item'>
      <input type="phone" name="phone" placeholder="EnterPhone" 
      required
      ref={phone}/>
      
      </div>
      
      <div className='from-item'>
      <input type="password" name="password" placeholder="EnterPassword" 
      required
      ref={password}/>
      
      </div>
      
      <div className='from-item'>
      <input type="password" name="confirm password" placeholder="ReEnterPassword"
      required
       ref={confirm} />
      </div>

      <button type='submit' className='form-button'>Register</button>
      </form>

    <button className='form-button' onClick={NavigateLogin}>Login</button>

      <div style={{color:"red"}} >
      {match? <p>Password should match</p>:<></>}
      {/* <h3 style={{color:"rgb(238, 179, 29)"}}>{message}</h3> */}
      {message=='yes' ? <Navigate to='/login'/> : null}
      </div>
      
    </div>
    </div>
      </Card>          
            </Grid>
          </Grid>

        
    )
  }

export default Register
