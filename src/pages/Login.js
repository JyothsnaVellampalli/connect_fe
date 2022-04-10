import React,{useState,useRef, useContext} from 'react';
import {Grid,Typography,Card,Box, CircularProgress} from '@mui/material';
import icon from '../Assests/profiles/connect.jpg';
import {loginCall} from './apiCalls';
import {AuthContext} from '../Context/AuthContext';


function Login() {
  const email = useRef();
  const password = useRef();
  let [message,setMessage] = useState('');
  const {user, isFetching, dispatch } = useContext(AuthContext);
  console.log(user);
async function handleSubmit(event){
  if(event){
    event.preventDefault();
  }
  loginCall(
    {email : email.current.value, password : password.current.value},
    dispatch )
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
        <h3 className="form-title">Login</h3>
      <form>
        <div className='from-item'>
        <input type='email' placeholder='Enter Email' 
        ref={email} required
        />
        </div>
        <div className='from-item'>
        <input type='password' placeholder='Enter Password' 
        ref={password} required
        minLength='6'
        />
        </div>
      <button type='submit' className='form-button' onClick={handleSubmit}>Login</button>
      <div>Forgot Password ?</div>
      <button type='submit' className='secondary-button' >Create an Account</button>
      </form>
      {isFetching ? (<CircularProgress color='inherit'/>):''}
      <h3 style={{color:'green'}}>{message}</h3>
      {/* <Link to='/forgotpassword'>ForgotPassword</Link> */}
      
    </div>
    </div>
      </Card>          
            </Grid>
          </Grid>
  )
}

export default Login
