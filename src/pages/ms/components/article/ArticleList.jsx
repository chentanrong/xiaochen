import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux'
import { List, Avatar, Icon, Button ,Input} from 'antd';
import 'moment/locale/zh-cn';
import txtp from '../../../../res/img/zhtp.png'
import '../../../../res/css/common.css'
import API from '../../../../utils/API';
import { NOLOGIN, loginStateAction, PATH ,articleListStateAction} from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
const Search = Input.Search;
const IconText = ({ type, text }) => (
    <Button type='ghost' >
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </Button>
);

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        }
    }

    componentDidMount() {
        let curState= this.props.articleListState;
        this.query(curState.path, 0, curState.search)
    }
    componentDidUpdate(preProps){
        let preState= preProps.articleListState;
        let curState= this.props.articleListState;
        if(preProps&&curState&&curState.path){
            if(preState.search!=curState.search||preState.page!=curState.page||preState.path!=curState.path){
                this.query(curState.path,curState.page,curState.search);
            }
        }

    }
    query(path, page, index) {
        API.queryArticleByPage(path, page, index).then(newdata => {
            let data = page == 0 ? newdata.items : this.state.data.concat(newdata.items);            
            this.setState({
                data,
                loading: false,
                hasMore: newdata.currentPage < newdata.allPage,
                page: newdata.currentPage
            });
            this.props.changeArticleListState({...this.props.articleListState, page: newdata.currentPage}) 
        }).catch(err => {
            if (NOLOGIN === err) {
                this.props.changeLoginState(false)
            } else {
                message.info(err);
            }
        })

    }
    handleInfiniteOnLoad = () => {
        if (this.state.hasMore) {
            if (!this.state.loading) {
                this.setState({
                    loading: true,
                });
                let curState= this.props.articleListState;
                this.query(curState.path, curState.page+1, curState.search)
             
            }

        } else {
            message.warning('加载完毕');
            this.setState({
                hasMore: false,
                loading: false,
            });
        }
    }
    itemClick(id) {
        var data = {
            id: id,
        }
        var path = {
            pathname: '/ms/ArticleDetail',
            state: data,
        }
        this.props.history.push(path)
    }
    admireClick(id) {
        if (this.props.loginState) {
            API.addArticleAdmire(id).then(newdata => {
                message.info('点赞成功');
            }).catch(err => {
                if (NOLOGIN === err) {
                    this.props.changeLoginState(false)
                } else {
                    message.info('操作出错');
                }
            })
        } else {
            message.info('请登录才能点赞');
        }
    }
    onSearch(value){
        let state= {...this.props.articleListState,path:value?"queryArticleByLikeByPage":"queryArticleOrderByDate",page: 0, search:value}
        this.props.changeArticleListState(state)
    }
    render() {
        let curState= this.props.articleListState;
        return (
        <div >
            <Search
                placeholder="输入搜索..."
                defaultValue={curState.search}
                onSearch={(value) =>
                 this.onSearch(value)
                 }
                enterButton
            />

            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={true}
            >

                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.state.data}
                    // footer={<div>我是底线</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.articleId}
                            extra={<div onClick={() => { this.admireClick(item.articleId) }}><IconText type="star-o" text={item.articleLikeCount || 0} /></div>}//, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />
                        >
                            <List.Item.Meta
                                onClick={() => this.itemClick(item.articleId)}
                                description={<div style={{ display: "flex", display: "-webkit-flex", flexFlow: "row nowrap", margin: '2px', alignItems: 'center' }}>
                                    <Avatar src={item ? item.user.img ? `${PATH}${item.user.img.path}` : txtp : txtp} size={16} />
                                    <div style={{ paddingLeft: "10px" }} >{item.user ? item.user.name : ""} {item.user ? item.articleDate : ""}</div>
                                </div>}
                                title={item.articleTitle}
                            />

                        </List.Item>
                    )}

                />
            </InfiniteScroll>
        </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        loginState: state.app.loginState,
        userInfo: state.app.userInfo,
        articleListState:state.app.articleListState

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: (b) => dispatch(loginStateAction(b)),
        changeArticleListState: (b) => dispatch(articleListStateAction(b))
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleList))