import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
            errMessage: ''

        }
    }
    handleOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePass = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        }
        catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">
                            Login
                        </div>
                        <div className="col-12 form-group input-login">
                            <label for="">Username:</label>
                            <input type="text" value={this.state.username}
                                className="form-control" onChange={(event) => { this.handleOnChangeUser(event) }}
                                placeholder='Enter your username' />
                        </div>
                        <div className="col-12 form-group input-login">
                            <label for="">Password:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPass ? 'text' : 'password'} value={this.state.password}
                                    className="form-control" onChange={(event) => { this.handleOnChangePass(event) }}
                                    placeholder='Enter your password' />
                                <span onClick={() => { this.handleShowHidePass() }}>
                                    <i className={this.state.isShowPass ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </span>

                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3 mb-3">
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-facebook-f fb"></i>
                            <i className="fab fa-google-plus-g gg"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
