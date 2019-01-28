import React, { Component } from 'react';
import { message, Button } from 'antd';
import { connect } from 'react-redux'
import { List, Avatar, Icon } from 'antd';
import 'moment/locale/zh-cn';
import txtp from '../../../../res/img/zhtp.png'
import API from '../../../../utils/API';
import '../../../../res/css/common.css'
import { NOLOGIN, loginStateAction, PATH } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import Marked from '../common/Marked';
import AddComment from '../comment/AddComment';
import CommentList from '../comment/CommentList';

const IconText = ({ type, text }) => (
    <Button type='ghost' >
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </Button>
);
class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        let loactionDtate = this.props.location.state
        let { id } = loactionDtate
        this.state = {
            id: id,
            data: undefined,
            loading: false
        }
    }
    componentDidMount() {
      this.query();
    }
    query(){
        this.setState({ loading: true })
        API.queryArticleById(this.state.id).then(data => {
            this.setState({ data, loading: false })
        }).catch(err => {
            this.setState({ loading: false })
            if (NOLOGIN === err) {
                this.props.changeLoginState(false)
            } else {
                message.info(err);
            }
        })
    }
    onClick() {
        let data1 = this.state.data
        if (data1) {
            var data = {
                id: data1.userId,
            }
            var path = {
                pathname: '/ms/UserInfo',
                state: data,
            }
            this.props.history.push(path)

        }
    }
    admireClick(id) {
        if (this.props.loginState) {
            API.addArticleAdmire(id).then(newdata => {
                message.info(newdata);
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
    refresh(){
        this.query();
    }
    render() {
        let data = this.state.data
        if (this.state.loading) {
            return <div>查询中...</div>
        }
        if (!data) {
            return <div>无数据</div>
        }
        let height = window.height
        let userInfo = data.user
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>{data.articleTitle}</h1>
                    <div className='time'>{data.articleDate}</div>
                    <div onClick={() => { this.admireClick(this.state.id) }}><IconText type="star-o" text={`${data.articleLikeCount || 0}  点赞`} /> </div>
                    <div style={{ display: "flex", display: "-webkit-flex", flexFlow: "row nowrap", justifyContent: "center", margin: '6px', }} onClick={() => this.onClick()}>
                        <Avatar src={userInfo.img ? `${PATH}${userInfo.img.path}` : txtp} size={40} />
                        <div >
                            <div>{userInfo.name}{userInfo.nickname}</div>
                            <div>{userInfo.phone}</div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", display: "-webkit-flex", flexFlow: "column nowrap" }}>
                    <h3>{data.articleViews}</h3>
                    <Marked style={{ height: height - 50, width: '100%', flexGrow: 1 }} text={data.articleContent} readOnly={true} />
                    <div style={{ height: '100%', width: '100%', wordBreak: 'break-word', marginLeft: '5px', textAlign: 'left' }}>
                        {this.props.loginState ? <AddComment parentId={data.articleId}  refresh={()=>this.refresh()}/> : null}
                        <CommentList parentId={data.articleId} />
                    </div>
                </div>



            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        loginState: state.app.loginState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // login: (username, password) => dispatch(loginAction(username, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetail))