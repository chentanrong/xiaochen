import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux'
import { InputItem, WingBlank } from "antd-mobile";
import { loginAction } from '../redux/actions'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import { Button } from '../../../../node_modules/antd';

class Login extends Component {
    constructor(props) {
        super(props);
        let name = Cookies.get('username')
        this.state = {
            username: name || '',
            phoneNumber: '',
            validateNumber: '',
        };
    }
    componentDidMount() {}

    render() {

        let input = {
            width: 230,
            position: 'relative',
            margin: '14px auto',          
           
        }
        return (
            <Fragment>
                <div
                    style={{ width: '100%', textAlign: 'center', height: '100%', verticalAlign: 'center',padding:'50px' }}>

                    <div style={input}>

                        <div style={{ display: 'flex', display: '-webkit-flex', flexFlow: 'row nowrap' }}>
                            <div style={{ flexGrow:1 ,textAlign:'left'}}>用户名</div>
                            <InputItem
                                defaultValue={this.state.username}
                                placeholder="请输入用户名"
                                data-seed="userneme"
                                className='antItemLogin'
                                onChange={this.getUsername.bind(this)}
                            />
                        </div>

                    </div>

                    <div style={input}>

                        <div style={{ display: 'flex', display: '-webkit-flex', flexFlow: 'row nowrap' }}>
                            <div style={{ flexGrow:1 ,width: '60px',textAlign:'left' }}>密码</div>
                            <InputItem
                                type="password"
                                placeholder="请输入密码"
                                onChange={this.getPwd}
                                className='antItemLogin'
                            />
                        </div>

                    </div>
                    <WingBlank style={{ padding: '8px' }}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Button type="primary"
                                style={{
                                    position: 'relative', width: 230, height: '40px', lineHeight: '40px'
                                    , margin: '0 auto', verticalAlign: 'center', textAlign: 'center',
                                }}
                                onClick={this.handleSubmit.bind(this)}>
                                登录</Button>
                        </div>

                    </WingBlank>
                    <div onClick={this.register}><span style={{color:"#dd3388"}}>注册</span></div>
                </div>
            </Fragment>
        )

    }
    //登录成功后跳转
    componentDidUpdate() {
        if (this.props.loginState) {
            this.props.history.push("/ms/MyInfo")
        }
    }
    //获取用户名
    getUsername = (event) => {
        this.setState({
            username: event
        });
    }
    //获取密码
    getPwd = (event) => {
        this.setState({
            pwd: event
        });
    }

    register=()=>{
        this.props.history.push("/ms/register")
    }

    //点击跳转
    handleSubmit = ((event) => {
        event.preventDefault();
        let state = this.state
        let name = state.username
        let password = state.pwd
        this.props.login(name, password)
    })

}
function mapStateToProps(state) {
    return {
        loginState: state.app.loginState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(loginAction(username, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))