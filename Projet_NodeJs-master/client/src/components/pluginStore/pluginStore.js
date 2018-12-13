import React, { Component } from 'react';
import PluginStoreItem from './pluginStoreItem';
import { connect } from 'react-redux';
import {getPlugins,getPluginsByTag,getPluginsByKeyWord} from '../../actions/pluginActions';
import PropTypes from 'prop-types';
import searchLogo from '../../img/search.png';
// import { prototype } from 'events';
require('./pluginStore.css');
class PluginStore extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword:'',
            tag:''
        }
        this.inputOnChange = this.inputOnChange.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }
    componentDidMount() {
        console.log("component did mount");
        
        let pathname = this.props.location.pathname;
        if(pathname==="/plugin-store"){
            this.props.getPlugins();
        }
        else{ 
            this.props.getPluginsByTag(this.props.match.params.tag);
        }
    }
    inputOnChange(event){
        event.preventDefault();
        this.setState({
            keyword: event.target.value
        })
        console.log(event.target.value);
    }
    searchHandler(event) {
        event.preventDefault();        
        this.props.getPluginsByKeyWord(this.state.keyword);
     
        // this.props.getPluginsByKeyWord()
        // let pluginsFindByTagPath = {
        //     pathname: '/plugin-store/'+element.id+'/'
        // }
        // return <Link to={pluginsFindByTagPath} key={index} className="tag">{element.id}</Link>
    }
    render() {        
        let listPlugins = this.props.plugin.plugins.map((element, index) => {
            return <PluginStoreItem isEmpty="false" plugin={element} key={index} getPluginsByTag={this.props.getPluginsByKeyWord}></PluginStoreItem> 
        })
        return (
            <div className="store-body">
                <div className="page-title">
                    <h1>PLUGINS</h1>
                    <p>Here be plugins</p>
                    <p className="shortline"></p>
                </div>
                <div className="search-container whiteframe">
                    <input id="search" type="text" className="feed-search-text" placeholder="Search plugins" onChange={this.inputOnChange}/>
                    <button type="button" className="feed-search-button" onClick={this.searchHandler}>
                        <img src={searchLogo} alt=""/>
                    </button>
                </div>
                <div className="store-plugins-container">
                    {listPlugins}
                    <PluginStoreItem isEmpty="true"></PluginStoreItem>
                    <PluginStoreItem isEmpty="true"></PluginStoreItem>
                </div>
            </div>
        )
    }
}
PluginStore.propTypes = {
    getPlugins: PropTypes.func.isRequired,
    getPluginsByTag: PropTypes.func.isRequired,
    getPluginsByKeyWord :PropTypes.func.isRequired,
    plugin: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    plugin : state.plugin
})

export default connect(mapStateToProps,{getPlugins,getPluginsByTag,getPluginsByKeyWord})(PluginStore);