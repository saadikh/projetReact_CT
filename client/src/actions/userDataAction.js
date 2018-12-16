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
} from './types';
import axios from 'axios';
export const getMyPlugins = (id) => dispatch => {
    dispatch(setUserDataLoading());
    let pathname = '/api/user/myplugins/' + id;
    axios
        .get(pathname)
        .then(res => dispatch({
            type: GET_MY_PLUGINS,
            payload: res.data
        }))
}

export const getPluginToModify = (id) => dispatch => {
    dispatch(setUserDataLoading());
    let pathname = '/api/plugin/' + id;
    axios
        .get(pathname)
        .then(res => dispatch({
            type: GET_PLUGIN_TO_MODIFY,
            payload: res.data
        }))
}
export const deletePlugin = (userId,id) => dispatch => {
    axios
        .delete('/api/plugin/' + userId+'/'+id)
        .then(res => {
            console.log(res);
            dispatch({
                type:DELETE_PLUGIN,
                payload:id
            });
        })
        .catch(err => console.log(err));
}
export const modifyPlugin = (key, value) => dispatch => {
    dispatch({
        type: MODIFY_PLUGIN,
        key: key,
        value: value
    })
}
export const addPluginParametre = (newParametre) => dispatch => {
    dispatch({
        type: ADD_PLUGIN_PARAMETRE,
        payload: newParametre
    })
}

export const deletePluginParametre = (parametre) => dispatch => {
    dispatch({
        type: DELETE_PLUGIN_PARAMETRE,
        payload: parametre
    })
}
export const addPluginTag = (tag) => dispatch => {
    dispatch({
        type: ADD_PLUGIN_TAG,
        payload: tag
    })
}
export const deletePluginTag = (index) => dispatch => {
    dispatch({
        type: DELETE_PLUGIN_TAG,
        payload: index
    })
}
export const updateMyPlugin = (id, data) => {
    axios({
        method: 'put',
        url: '/api/plugin/' + id,
        headers: {
            'content-type': 'multipart/form-data'
        },
        data: data
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response);
        });
}

export const setUserDataLoading = () => {
    return {
        type: LOADING_USER_DATA
    }
}

