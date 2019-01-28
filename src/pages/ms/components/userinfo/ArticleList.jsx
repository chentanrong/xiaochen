import React, { Component } from 'react';
import { message, Button } from 'antd';
import { connect } from 'react-redux'
import { List, Avatar, Icon } from 'antd';
import 'moment/locale/zh-cn';
import API from '../../../../utils/API';
import { NOLOGIN, loginStateAction } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { EDETE_TYPE } from '../article/AddArticle';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
            page: 0
        }
    }

    componentDidMount() {
        this.query(0)
    }
    query(page) {
        if (this.props.userId) {
            this.doquery(page, this.props.userId)
        } else if (this.props.loginState & this.props.userInfo.id) {
            this.doquery(page, this.props.userInfo.id)
        }

    }
    doquery(page, id) {
        API.getArticleByUser(page, id).then(newdata => {
            let data = this.state.data.concat(newdata)
            this.setState({
                data,
                loading: false,
                hasMore: newdata.currentPage < newdata.allPage,
                page: newdata.currentPage
            });
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
                this.query(this.state.page + 1)
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
    updateArticle(data) {
        var data = {
            artcle: data,
            type: EDETE_TYPE
        }
        var path = {
            pathname: '/ms/AddArticle',
            state: data,
        }
        this.props.history.push(path)
    }
    deleteArticle(id, index) {
        API.deleteArticle(id).then(newdata => {
            message.success("操作成功");
            this.state.data.splice(index, 1)
            this.setState({ data: this.state.data })
        }).catch(err => {
            if (NOLOGIN === err) {
                this.props.changeLoginState(false)
            } else {
                message.info(err);
            }
        })

    }

    render() {
        return (
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
                    renderItem={(item, index) => (
                        <List.Item
                            key={index}
                            style={{ textAlign: 'left' }}
                            extra={[<IconText type="star-o" text={item.articleLikeCount || 0} />,
                            this.props.showDelet ? <Button type="ghost" onClick={() => this.deleteArticle(item.articleId, index)}>删除</Button> : null,
                            this.props.showUpdate ? <Button type="ghost" onClick={() => this.updateArticle(item)}>编辑</Button> : null]}
                        >
                            <List.Item.Meta
                                onClick={() => this.itemClick(item.articleId)}
                                description={<div style={{ display: "flex", display: "-webkit-flex", flexFlow: "row nowrap", margin: '2px', alignItems: 'center' }}>
                                    {/* <Avatar src={item ? item.user.img ? `${PATH}${item.user.img.path}` : txtp : txtp} size={16} /> */}
                                    <div>{item.user ? item.user.name : ""}{item.user ? item.articleDate : ""}
                                    </div>
                                </div>}
                                title={item.articleTitle}
                            />
                            {item.articleCommentCount}
                        </List.Item>
                    )}

                />
            </InfiniteScroll>
        )
    }
}
function mapStateToProps(state) {
    return {
        loginState: state.app.loginState,
        userInfo: state.app.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: (b) => dispatch(loginStateAction(b))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleList))