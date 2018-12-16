import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import {connect} from 'react-redux';
import{getPluginById} from '../../actions/pluginActions';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
require('./css/pluginDetail.css');

class PluginDetail extends Component {
    // constructor(props){
    //     super(props);
    // }
    // searchByTag = (tag,e) => {
        
    //     axios
    //     .get('/api/plugin/tag/'+tag)
    //     .then((res) => {
    //         let count = 0;
    //         count++;
    //         console.log(res);
    //         console.log(count);
            
    //     })
    // }
    componentWillMount(){
        this.props.getPluginById(this.props.match.params.id);
    }
    getPluginCookie = () => {
        try {
            console.log(this.props);
            const plugin = JSON
                .parse(Array(localStorage.getItem('state')))
                .find(plugin => plugin._id === this.props.match.params.id);
            if (plugin === null) {
                return undefined;
            }
            return plugin;
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        let tags;
        let parametres
        console.log((this.props.plugin));

        
        if(!isEmpty(this.props.plugin)){
            let plugin = this.props.plugin;
            tags = plugin.tag.map((element, index) => {
                let pluginsFindByTagPath = {
                    pathname: '/plugin-store/'+element.id+'/'
                }
                return <Link to={pluginsFindByTagPath} key={index} className="tag">{element.text}</Link>
            })
            parametres = plugin.parametres.map((element, index) => {
                return (
                    <tr key={index} className="parametre-row">
                        <td>{element.controler}</td>
                        <td>{element.default}</td>
                        <td>{element.min}</td>
                        <td>{element.max}</td>
                    </tr>
                )
    
            })
        }
        
        if(!isEmpty(this.props.plugin)){
            return (
                <div className="detail-body">
                    <div className="main-box flex-column">
                        <div className="venteur flex-column">
                            <span className="font-weight-7 sellor">{this.props.plugin.sellerName}</span>
                            <span>{this.props.plugin.siteSellerUrl}</span>
                        </div>
                        <h2 className="font-weight-7 creator">{this.props.plugin.creator}</h2>
                        <img className="plugin-image" src={this.props.plugin.imageUrl} alt=''></img>
                        <div className="tags-container">{tags}</div>
                        <p className="desc">{this.props.plugin.description}</p>
                        <table className="parametre-table">
                            <thead>
                                <tr>
                                    <th>Control</th>
                                    <th>Default</th>
                                    <th>Min</th>
                                    <th>Max</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parametres}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }else{
            return(
                <h1>loading......</h1>
            )
        }
        
    }
}
PluginDetail.propTypes = {
    plugin:PropTypes.object.isRequired
    // getMyPlugins:PropTypes.func.isRequired,
    // deletePlugin:PropTypes.func.isRequired,
    // userData:PropTypes.object.isRequired,
    // auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    plugin:state.plugin.pluginAboutToShow
})
export default connect(mapStateToProps,{getPluginById})(PluginDetail);