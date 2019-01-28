import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux'
import { List, Avatar, Icon ,Button} from 'antd';
import 'moment/locale/zh-cn';
import API from '../../../../utils/API';
import { NOLOGIN, loginStateAction, PATH, COMMENT_TYPE } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Marked from '../common/Marked';
import txtp from '../../../../res/img/zhtp.png'
import '../../../../res/css/common.css'
const IconText = ({ type, text }) => (
    <Button type='ghost' >
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </Button>
);
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
            page: 0,
            parentId: props.parentId || props.artcleId
        }
    }

    componentDidMount() {
        this.query(0)
    }
    query(page) {
        API.queryCommentByParent(page, this.state.parentId).then(newdata => {
            let data = page == 0 ? newdata.items : this.state.data.concat(newdata.items);
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

    admireClick(id) {
        if (this.props.loginState) {
            API.addAdmire(id, COMMENT_TYPE).then(newdata => {
                message.info(newdata);
                this.query(0);
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

    render() {
        return (
            <div style={{ ...this.props.style }}>
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
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                extra={<div onClick={() => { this.admireClick(item.commentId) }}><IconText type="star-o" text={`${item.commentLikeCount || 0} 赞`} /></div>}
                            >
                                <List.Item.Meta
                                    title={<div style={{ display: "flex", display: "-webkit-flex", flexFlow: "row nowrap", margin: '2px', alignItems: 'center' }}>
                                        <Avatar src={item ? item.user.img ? `${PATH}${item.user.img.path}` : txtp : txtp} size={30} />
                                        <div>{item.user ? item.user.name : ""}
                                            <div className='time'>{item.user ? item.commentDate : ""}</div></div>
                                    </div>}
                                    description={<div>
                                        <Marked text={item.commentContent} readOnly={true} height='100%' />
                                    </div>}
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
        artcleId: state.app.artcleId,
        loginState: state.app.loginState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: (b) => dispatch(loginStateAction(b))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList))