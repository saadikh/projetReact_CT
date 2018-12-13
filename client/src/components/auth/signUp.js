import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignUpRequest } from '../../actions/signUpAction';
import { addFlashMessage } from '../../actions/flashMessageAcion';
import classnames from 'classnames';
// import {withRouter} from 'react-router-dom';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            isLoading: false,
            error: {}
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ error: {}, isLoading: true });
        let user = this.state;
        this.props.userSignUpRequest(user)
            .then(
                () => {
                    // this.props.history.push("/login");
                    this.props.addFlashMessage("Sign up successfully");
                    this.context.router.history.push("/login");
                },
                ({ response }) => {
                    this.setState({
                        error: response.data,
                        isLoading: false
                    })
                }
            )
    }
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    render() {
        const { error } = this.state;
        return (
            <div className="login-body">
                <div id="login">
                    <div className="inner">
                        <form id="loginForm" className="login_form inner" autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="sign-up-input-group">
                                <input type="text" className={classnames("text_ login form-control", { "is-invalid": error.username })} id="username" placeholder="Username" onChange={this.handleInputChange} />
                                {error.username && <span>{error.username}</span>}
                            </div>
                            <div className="sign-up-input-group">
                                <input type="text" className={classnames("text_ login form-control", { "is-invalid": error.email })} id="email" placeholder="Email" onChange={this.handleInputChange} />
                                {error.email && <span>{error.email}</span>}
                            </div>
                            <div className="sign-up-input-group">
                                <input type="password" className={classnames("text_ login form-control", { "is-invalid": error.password })} id="password" placeholder="Password" onChange={this.handleInputChange} />
                                {error.password && <span>{error.password}</span>}
                            </div>
                            <div className="sign-up-input-group">
                                <input type="password" className={classnames("text_ login form-control", { "is-invalid": error.passwordConfirmation })} id="passwordConfirmation" placeholder="Password Confirmation" onChange={this.handleInputChange} />
                                {error.passwordConfirmation && <span>{error.passwordConfirmation}</span>}
                            </div>
                            <button disabled={this.state.isLoading} className="btn buttons_ login buttons_login" id="submit">Button</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
};

SignUp.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    user: state
})
// export default withRouter(connect(mapStateToProps, { userSignUpRequest })(SignUp));
export default connect(mapStateToProps, { userSignUpRequest,addFlashMessage })(SignUp);