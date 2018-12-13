import axios from 'axios';
import {GET_PLUGINS,GET_PLUGINS_BY_TAG,GET_PLUGINS_BY_KEYWORD,DELETE_PLUGIN,LOADING_PLUGIN} from './types';
export const getPlugins = () => dispatch => {    
    dispatch(setPluginsLoading());
    console.log("getting plugins");
    axios
        .get('/api/plugin')
        .then(res => dispatch({
            type: GET_PLUGINS,
            payload:res.data
        }))
};
export const getPluginsByTag = (tag) => dispatch => {    
    dispatch(setPluginsLoading());
    console.log("getting plugins by tag");
    let url_get_plugins_by_tag = '/api/plugin/tag/'+tag;
    axios
        .get(url_get_plugins_by_tag)
        .then(res => dispatch({
            type: GET_PLUGINS_BY_TAG,
            payload:res.data
        }))
};
export const getPluginsByKeyWord = (keyword) => dispatch => {
    dispatch(setPluginsLoading());
    console.log("searching plugins");
    let url_get_plugins_by_keyword = 'api/plugin/search/'+keyword;
    console.log(url_get_plugins_by_keyword);
    
    axios
        .get(url_get_plugins_by_keyword)
        .then(res => dispatch({
            type:GET_PLUGINS_BY_KEYWORD,
            payload:res.data
        }))
}
export const deletePlugin = id => dispatch=>{
    axios
        .delete('/api/plugin/'+id)
        .then(res => dispatch({
            type:DELETE_PLUGIN,
            payload:id
        }))
};
export const addPlugin  = plugin => dispatch=>{
    axios.post('/api/plugin',plugin)
}
export const setPluginsLoading = ()=>{
    return{
        type:LOADING_PLUGIN
    }
}