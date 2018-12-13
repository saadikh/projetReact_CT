import { GET_PLUGINS, GET_PLUGINS_BY_TAG,GET_PLUGINS_BY_KEYWORD,ADD_PLUGIN, DELETE_PLUGIN, LOADING_PLUGIN } from '../actions/types';
const initialState = {
    plugins: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PLUGINS:
            return {
                ...state,
                plugins: action.payload,
                loading:false
            };
        case GET_PLUGINS_BY_TAG:
            return {
                ...state,
                plugins: action.payload,
                loading:false
            }
        case GET_PLUGINS_BY_KEYWORD:
            return {
                ...state,
                plugins: action.payload,
                loading:false
            }
        case DELETE_PLUGIN:
            return {
                // ...state,
                plugins: state.plugins.filter(plugin => plugin._id !== action.payload)
            };
        case ADD_PLUGIN:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case LOADING_PLUGIN:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
};

