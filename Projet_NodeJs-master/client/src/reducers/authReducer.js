import {SET_CURRENT_USER } from '../actions/types';
import {isEmpty} from 'lodash';
const initialState = {
    user:{},
    isSignIn:false
}
const auth = (state = initialState, action = {}) => {
    switch(action.type){
        case SET_CURRENT_USER :
            console.log(!isEmpty(action.user));
            
            return {
                ...state,
                user:action.user,
                isSignIn: !isEmpty(action.user)
            }
        default: return state;
    }
}

export default auth;