import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
export default function(ComponentSecured) {
    class Authenticate extends Component{
        static contextTypes = {
            router: PropTypes.object
        }
        componentWillMount(){
            if(!this.props.isAuth){
                this.context.router.history.push("/login");
            }
        }
        componentWillUpdate(nextProps){
            if(!nextProps.isAuth){
                this.context.router.history.push("/");
            }
        }
        render(){
            return(
                <ComponentSecured {...this.props}/>
            )
        }
    }
    Authenticate.propTypes = {
        isAuth: PropTypes.bool.isRequired
    }
    const mapStateToProps = (state) => ({
        isAuth: state.auth.isSignIn
    })
    return connect(mapStateToProps)(Authenticate);
}