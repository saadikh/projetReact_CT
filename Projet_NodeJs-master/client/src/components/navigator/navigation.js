import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../actions/loginAction';
import PropTypes from 'prop-types';
require('./navigator.css');
class Navigation extends Component {
    logout = () => {
        this.props.logout();
        console.log(this.props);
    }
    render() {
        let userLogin = (<li><NavLink to="/login">Sign in/Sign up</NavLink></li>);
        if (localStorage.jwtToken) {
            const userName = String(this.props.auth.user[0].username);
            userLogin = (
                <li className="first-level-menu">
                    <NavLink to="#">{userName.substring(0, 1).toUpperCase() + userName.substring(1)}</NavLink>
                    <ul className="second-level-menu">
                        <li><NavLink to="/plugins/upload">Upload my plugin</NavLink></li>
                        <li onClick={this.logout}>Log out</li>
                    </ul>
                </li>


            )
        }

        const userNotLogin = (
            <li><NavLink to="/login">Sign in/Sign up</NavLink></li>
        )
        return (
            <div className="site-header">
                <div className="site-header_main">
                    <div className="header">
                        <div className="site-header__logo center">
                            <NavLink to="/">
                                <img src="https://www.moddevices.com/hubfs/assets/logos/mod-devices-logo-on-dark.png" alt=''/>
                            </NavLink>
                        </div>
                        <ul className="site-header__main-menu center">
                            <li><NavLink to="#">Product</NavLink></li>
                            <li className="first-level-menu">
                                <NavLink to="/plugin-store">Plugin Gallery</NavLink>
                                <ul className="second-level-menu">
                                    <li>New plugins</li>
                                    <li>Most popular plugins</li>
                                    <li>Classic</li>
                                </ul>
                            </li>
                            <li><NavLink to="#">Play</NavLink></li>
                            <li><NavLink to="#">Learn</NavLink></li>
                            <li><NavLink to="#">Community</NavLink></li>
                        </ul>
                        <ul className="site-header__secondary-menu center">
                            <li><NavLink to="#">About</NavLink></li>
                            <li><NavLink to="#">Contact</NavLink></li>
                            <li><NavLink to="#">Blog</NavLink></li>
                            {/* {this.props.auth.isSignIn?userLogin:userNotLogin} */}
                            {/* <li><NavLink to="/login">Sign in/Sign up</NavLink></li> */}
                            {this.props.auth.isSignIn ? userLogin : userNotLogin}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout})(Navigation);