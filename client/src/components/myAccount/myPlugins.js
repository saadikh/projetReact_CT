import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getMyPlugins,deletePlugin} from '../../actions/userDataAction';
import PropTypes from 'prop-types';
import MyPluginItem from './myPluginItem';
require('./myAccount.css');

class MyPlugins extends Component {
    componentWillMount(){
        this.props.getMyPlugins(this.props.auth.user[0]._id);
    }
    componentDidMount(){
        this.props.getMyPlugins(this.props.auth.user[0]._id);
    }
    render(){
        if(this.props.auth.user[0]){
            let plugins = this.props.userData.userData;
        let myPluginsList = plugins.map((element,index) => {
            return<MyPluginItem isEmpty="false" plugin={element} key={index} userId={this.props.auth.user[0]._id} deletePlugin={this.props.deletePlugin}></MyPluginItem> 
        })
        return(
            <div className="store-plugins-container">{myPluginsList}</div>
        )
        }else{
            return(
                <h1>I have no idea where i am</h1>
            )
        }
    }
}

MyPlugins.propTypes = {
    getMyPlugins:PropTypes.func.isRequired,
    deletePlugin:PropTypes.func.isRequired,
    userData:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    userData:state.userData
})
export default connect(mapStateToProps,{getMyPlugins,deletePlugin})(MyPlugins);