import axios from 'axios';

export async function loginCall(userCredential,dispatch){
    dispatch({type : 'LOGIN_START'});
    try{
        const res = await axios.post('http://localhost:4000/auth/login',userCredential);
        console.log(res.data);
        dispatch({type : 'LOGIN_SUCCESS', payload : res.data.data, message : res.data.message});
    }catch(err){
        dispatch({type: 'LOGIN_FAILURE', payload:err})

    }

}