import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import { Button, Icon } from 'antd';
import { connect } from 'react-redux'

const menus = [
// {
//     path: '/ms/priceTrend',
//     name: '首页',
//     icon: 'home'
// },
{
    path: '/ms/ArticleList',
    name: '文章',
    icon: 'profile'
}
// , {
//     path: '/ms/priceTrend',
//     name: '博主',
//     icon: 'user'
// }
];

class index extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menus: menus,
            currentPath: '/ms/login'
        }
    }

    onItemClick(menu) {
        this.props.history.push(menu.path)
    }
    onLoginClick() {
        if (this.props.loginState) {
            this.props.history.push('/ms/MyInfo')
        } else {
            this.props.history.push('/ms/login')
        }
    }
    onAddArticleClick() {
        if (this.props.loginState) {
            var data = {
                type: undefined,
            }
            var path = {
                pathname: '/ms/AddArticle',
                state: data,
            }
            this.props.history.push(path)
        } else {
            this.props.history.push('/ms/login')
        }
    }
    render() {
        let loginState = this.props.loginState ? '已登录' : "请登录"
        let userInfo = this.props.userInfo
        return (
            <div style={{ display: 'flex', display: '-webkit-flex', flexFlow: 'row nowrap', alignItems: 'center' }}>

                <div style={{ marginRight: '20px' }}>小陈博客</div>
                {
                    this.state.menus.map(menu => {
                        return <div key={menu.path} style={{ marginLeft: '10px', height: '100%' }}
                            onClick={() => { this.onItemClick(menu) }}>
                            <Icon type={menu.icon} />
                            <span>
                                <a style={{ color: "inherit", textDecoration: "none" }}>{menu.name}</a>
                            </span>
                        </div>
                    })
                }

                <div style={{ marginLeft:'20px',marginRight: '20px' }} onClick={() => { this.onLoginClick() }}>
                    {userInfo.name}{loginState}
                </div>
                <div style={{ borderRadius: '14px' }} onClick={() => { this.onAddArticleClick() }}>
                    <Button type="primary">写文章</Button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        loginState: state.app.loginState,
        userInfo: state.app.userInfo,
    }
}


export default withRouter(connect(mapStateToProps)(index))