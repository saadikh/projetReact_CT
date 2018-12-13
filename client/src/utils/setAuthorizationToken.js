import axios from 'axios';

const setAuthorizationToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Beare '+token;
    }else{
        axios.defaults.headers.common['Authorization'] = null;
    }
}
export default setAuthorizationToken;