import React, { Component } from 'react';
import { message, Button } from 'antd';
import { connect } from 'react-redux'
import 'moment/locale/zh-cn';
import API from '../../../../utils/API';
import { NOLOGIN, loginStateAction } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import Marked from '../common/Marked';

export const EDETE_TYPE='EDETE_TYPE'
class AddArticle extends Component {
    constructor(props) {
        super(props);
        let loactionDtate = this.props.location.state
        let { type } = loactionDtate
        let cArtcle=undefined
        if(type==EDETE_TYPE){
            let { artcle } = loactionDtate
            cArtcle=artcle
        }
        this.state = {
            loading: false,
            text: cArtcle ? cArtcle.articleContent : '',
            title: cArtcle ? cArtcle.articleTitle : '',
            view: cArtcle ? cArtcle.articleViews : '',
            cArtcle:cArtcle
        }
    }
    componentDidMount() {
        if (!this.props.loginState) {
            this.props.history.push('/ms/login')
        }
        this.query();
    }
    textChange(v) {
        this.setState({
            text: v
        })
    }
    titleChange = (v) => {
        this.setState({
            title: v.target.value
        })
    }
    query(){
       let cArtcle= this.state.cArtcle;
        if(cArtcle){
            this.setState({ loading: true })
            API.queryArticleById(cArtcle.articleId).then(data => {
                this.setState({ cArtcle:data,text:data.articleContent, loading: false })
            }).catch(err => {
                this.setState({ loading: false })
                if (NOLOGIN === err) {
                    this.props.changeLoginState(false)
                } else {
                    message.info(err);
                }
            })
        }
       
    }
    onPublish() {
        let state = this.state
        if (this.state.text) {
            this.setState({ loading: true })
            let mode = { ...state.cArtcle, title: state.title, content: state.text, views: this.state.view }
            if (this.state.cArtcle) {
                API.updateArticle(mode).then(data => {
                    message.info(data);
                    this.props.history.push('/ms/MyInfo')
                }).catch(err => {
                    this.setState({ loading: false })
                    if (NOLOGIN === err.type) {
                        this.props.changeLoginState(false)
                    } else {
                        message.info(err);
                    }
                })
            } else {
                API.addArticle(mode).then(data => {
                    message.info("恭喜您，发表成功");
                    this.props.history.push('/ms/MyInfo')
                }).catch(err => {
                    this.setState({ loading: false })
                    if (NOLOGIN === err.type) {
                        this.props.changeLoginState(false)
                    } else {
                        message.info(err);
                    }
                })
            }

        }
    }
    render() {
        let st = { margin: '8px auto', }
        let state=this.state;
        return (
            <div >
                <Input placeholder={'请输入标题'} style={st} value={state.title} onChange={this.titleChange} />
                <div style={{ display: "flex", display: "-webkit-flex", flex: "row nowrap" }}>
                    <Input placeholder={'请输入摘要'} style={st} value={state.view} onChange={v => { this.setState({ view: v.target.value }) }} />
                    <Button type="primary" style={{ ...st, marginLeft: '5px' }} onClick={() => this.onPublish()}>发布</Button>
                </div>
                <Marked text={state.text} textChange={v => this.textChange(v)} style={st} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginState: state.app.loginState
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//          AddArticle: (username, password) => dispatch(AddArticleAction(username, password))
//     }
// }

export default withRouter(connect(mapStateToProps)(AddArticle))