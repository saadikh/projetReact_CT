import axios from 'axios';

export const userSignUpRequest = (user) => dispatch => {    

    console.log("signup user");
    return(
        axios
        .post('/api/user',user)
    )
    
        
};