import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux'
import { InputItem, WingBlank, Toast, Badge } from "antd-mobile";
import { message } from "antd";
import { loginAction } from '../redux/actions'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import { Button } from '../../../../node_modules/antd';
import API from '../../../utils/API';

class register extends Component {
    constructor(props) {
        super(props);
        let name = Cookies.get('username')
        this.state = {
            name: name || '',
            email: '',
            code: '',
            pwd: ""
        };
    }

    componentDidMount() { }


    register() {
        let state = this.state
        if (!state.email || !state.code) {
            Toast.info('请输入邮箱和验证码', 1)
            return
        }
        if (!state.pwd || !state.name) {
            Toast.info('请输入用户名和密码', 1)
            return
        }
        API.register(state.name, state.pwd, state.email, state.code).then(newData => {
            message.info('注册成功,请登录');
            this.props.history.push("/ms/MyInfo")
        }).catch(err => {
            message.info('操作错误');

        })
    }
    getCode() {
        if (!this.state.email) {
            message.info('您没有输入邮箱');
            return
        }
        API.getCode(this.state.email).then(newData => {
            message.info('验证码发送成功');
        }).catch(err => {
            message.info('操作错误');
        })
    }
    render() {

        let input = {
            width: 230,
            position: 'relative',
            margin: '14px auto',
        }
        let bt = <Badge style={{
            marginLeft: 4,
            backgroundColor: '#5c6ff5',
            borderRadius: 12,
            height: '26px',
            textAlign: 'center',
            verticalAlign: 'center',
            lineHeight: '26px',
            color: '#fff',
            border: '1px solid #5c6ff5'
        }} text='获取验证码' onClick={this.getCode.bind(this)} />
        return (
            <Fragment>
                <div
                    style={{ width: '100%', textAlign: 'center', height: '100%', verticalAlign: 'center', padding: '50px' }}>
                    <div style={input}>
                        <div style={{ display: 'flex', display: '-webkit-flex', flexFlow: 'row nowrap' }}>
                            <div style={{ flexGrow: 1, textAlign: 'left' }}>邮箱</div>
                            <InputItem
                                defaultValue={this.state.email}
                                placeholder="请输入邮箱"
                                data-seed="userneme"
                                className='antItemLogin'
                                onChange={this.onEmaiChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div style={input}>
                        <div style={{ display: 'flex', display: '-webkit-display', flexFlow: 'row nowrap' }}>
                           <div style={{ flexGrow: 1, textAlign: 'left' }}>验证码</div>
                            <InputItem
                                maxLength={6}
                                placeholder="验证码"
                                onChange={this.onCodeChange}
                                className='antItemLogin'
                                value={this.state.code}
                                extra={bt}
                            />
                        </div>
                    </div>
                    <div style={input}>

                        <div style={{ display: 'flex', display: '-webkit-flex', flexFlow: 'row nowrap' }}>
                            <div style={{ flexGrow: 1, textAlign: 'left' }}>用户名</div>
                            <InputItem
                                defaultValue={this.state.name}
                                placeholder="请输入用户名"
                                data-seed="userneme"
                                className='antItemLogin'
                                onChange={this.getUsername.bind(this)}
                            />
                        </div>

                    </div>

                    <div style={input}>

                        <div style={{ display: 'flex', display: '-webkit-flex', flexFlow: 'row nowrap' }}>
                            <div style={{ flexGrow: 1, width: '60px', textAlign: 'left' }}>密码</div>
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
                                onClick={this.register.bind(this)}>
                                注册</Button>
                        </div>

                    </WingBlank>
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

    getUsername = (event) => {
        this.setState({
            name: event
        });
    }

    getPwd = (event) => {
        this.setState({
            pwd: event
        });
    }
    onCodeChange = (event) => {
        this.setState({
            code: event
        });
    }
    onEmaiChange = (event) => {
        this.setState({
            email: event
        });
    }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(register))