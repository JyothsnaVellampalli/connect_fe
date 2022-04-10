const AuthReducer =(state,action)=>{
    switch(action.type){
        case 'LOGIN_START' :    
            return{
                user:{},
                isFetching:true,
                error : false
            };
        case "LOGIN_SUCCESS" : 
            console.log('LOGIN_SUCCESS');
            return{
                user: action.payload,
                message : action.message,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
            
    }
}

export default AuthReducer;