import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function saveStateToLocal(state){
    try{
        const serialiedState = JSON.stringify(state.plugin.plugins);
        localStorage.setItem('state',serialiedState);
    }catch(e){
        console.log(e)
    }
}

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer,initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

store.subscribe(() => saveStateToLocal(store.getState()));
export default store;