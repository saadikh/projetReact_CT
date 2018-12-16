import {
    GET_MY_PLUGINS,
    LOADING_USER_DATA,
    GET_PLUGIN_TO_MODIFY,
    MODIFY_PLUGIN,
    ADD_PLUGIN_PARAMETRE,
    DELETE_PLUGIN_PARAMETRE,
    ADD_PLUGIN_TAG,
    DELETE_PLUGIN_TAG,
    DELETE_PLUGIN
} from '../actions/types';
// import { stat } from 'fs';

const initialState = {
    userData: [],
    pluginToModify: {
        sellerName: '',
        siteSellerUrl: '',
        creator: '',
        imageUrl: '',
        description: '',
        parametres: [{
            controler: '',
            default: 0.00,
            min: 0.00,
            max: 0.00
        }],
        tag: [{
            id: '',
            text: ''
        }],
    },
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MY_PLUGINS:
            return {
                ...state,
                userData: action.payload,
                loading: false
            }
        case LOADING_USER_DATA:
            return {
                ...state,
                loading: true
            }
        case GET_PLUGIN_TO_MODIFY:
            return {
                ...state,
                pluginToModify: action.payload,
                loading: false
            }
        case MODIFY_PLUGIN:
            return {
                ...state,
                pluginToModify: {
                    ...state.pluginToModify,
                    [action.key]: action.value
                }
            }
        case ADD_PLUGIN_PARAMETRE:
            return {
                ...state,
                pluginToModify: {
                    ...state.pluginToModify,
                    parametres: [...state.pluginToModify.parametres, action.payload]
                }
            }
        case DELETE_PLUGIN_PARAMETRE:
            return {
                ...state,
                pluginToModify: {
                    ...state.pluginToModify,
                    parametres: state.pluginToModify.parametres.filter((ele, index) => {
                        return (ele !== action.payload) ? ele : null;
                    })
                }
            }
        case DELETE_PLUGIN:
            return {
                ...state,
                userData: state.userData.filter((ele, index) => {
                    return (ele._id !== action.payload) ? ele : null;
                })
            }
        case ADD_PLUGIN_TAG:
            return {
                ...state,
                pluginToModify: {
                    ...state.pluginToModify,
                    tag: [...state.pluginToModify.tag, action.payload]
                }
            }
        case DELETE_PLUGIN_TAG:
            return {
                ...state,
                pluginToModify: {
                    ...state.pluginToModify,
                    tag: state.pluginToModify.tag.filter((ele, index) => {
                        return (index !== action.payload) ? ele : null;
                    })
                }
            }
        default:
            return state;
    }
}
