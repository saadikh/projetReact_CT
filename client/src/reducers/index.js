import{combineReducers} from 'redux';
import pluginReducer from './pluginReducer';
import flashMessage from './flashMessage';
import authReducer from './authReducer';
import userDataReducer from './userDataReducer';

export default combineReducers({
    plugin: pluginReducer,
    flashMessage: flashMessage,
    auth: authReducer,
    userData: userDataReducer
});