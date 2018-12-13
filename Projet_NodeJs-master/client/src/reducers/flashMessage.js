import {ADD_FLASH_MESSAGE} from '../actions/types';
const flashMessage = (
    state = {message: ''},
    action={}
) => {
    switch(action.type){
        case ADD_FLASH_MESSAGE: 
            return{
                ...state,
                message: action.message
            }
        ;
        default:return state;
    }
}
export default flashMessage;