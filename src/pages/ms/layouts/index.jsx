import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from 'antd';
import PriceTrend from '../components/PriceTrend';
import AppHeader from './header';
import UserInfo from '../components/UserInfo';
import login from '../components/login';
import ArticleList from '../components/article/ArticleList';
import AddArticle from '../components/article/AddArticle';
import ArticleDetail from '../components/article/ArticleDetail';
import MyInfo from '../components/MyInfo';
import register from '../components/register';



export default class LayoutMs extends Component {
    render() {
        let baseUrl = this.props.match.url
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Header   style={{ color: '#fff',height:'58px',lineHeight:'58px',position:'fixed',zIndex:99,width:"100%"}}>
                    <AppHeader/>
                </Layout.Header>
                <Layout>                  
                    <Layout style={{ padding: '10px',marginTop:'60px'}}>
                        <Layout.Content style={{ position: "relative" }}>
                            <Switch>
                                <Redirect exact from={`${baseUrl}/`} to={`${baseUrl}/login`} />
                                <Route path={`${baseUrl}/priceTrend`} component={PriceTrend}></Route>
                                <Route path={`${baseUrl}/UserInfo`} component={UserInfo}></Route>
                                <Route path={`${baseUrl}/MyInfo`} component={MyInfo}></Route>
                                <Route path={`${baseUrl}/login`} component={login}></Route>
                                <Route path={`${baseUrl}/ArticleList`} component={ArticleList}></Route>
                                <Route path={`${baseUrl}/AddArticle`} component={AddArticle}></Route>
                                <Route path={`${baseUrl}/ArticleDetail`} component={ArticleDetail}></Route>
                                <Route path={`${baseUrl}/register`} component={register}></Route>
                            </Switch>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}