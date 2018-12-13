import React, { Component } from 'react';
import PluginItem from './pluginItem';
import { connect } from 'react-redux';
import {getPlugins,getPluginsByTag} from '../../actions/pluginActions';
import PropTypes from 'prop-types';
require('./css/index.css');
class PluginList extends Component {
    componentWillMount() {
        this.props.getPlugins();
    }
    
    render() {
        let listPlugins = this.props.plugin.plugins.map((element, index) => {
            return <PluginItem isEmpty="false" plugin={element} key={index}></PluginItem> 
        })
        
        return (

            <div className="body">
                <div className="titres">
                    <h2>Inspiration in all the Classics</h2>
                    <span className="sub-description">All the famous stompboxes, FX, synths, sequencers and amps that made history</span>
                </div>
                <div className="listPlugins">
                    {listPlugins}
                    <PluginItem isEmpty="true"></PluginItem>
                    <PluginItem isEmpty="true"></PluginItem>
                </div>
            </div>
        )
    }
}
PluginList.propTypes = {
    getPlugins: PropTypes.func.isRequired,
    getPluginsByTag: PropTypes.func.isRequired,
    plugin: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    plugin: state.plugin
})

export default connect(mapStateToProps,{getPlugins,getPluginsByTag})(PluginList);