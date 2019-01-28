import React, { Component } from 'react';
import { message, Button } from 'antd';
import { connect } from 'react-redux'
import 'moment/locale/zh-cn';
import API from '../../../../utils/API';
import { NOLOGIN, articleAction } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import Marked from '../common/Marked';

const  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  ];
class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            loading: false,
            text: '',
        }
    }
    componentDidMount() {
        if (!this.props.loginState) {
            this.props.history.push('/ms/login')
        }
    }
    
    textChange(v) {
        this.setState({
            text: v
        })
    }
  
    onPublish() {
        let state = this.state
        if (this.state.text) {
            this.setState({ loading: true })         
            API.addComment(state.text,this.props.parentId,"").then(data => {
                message.success('提交成功');
                this.setState({text: ''})
                this.props.refresh()
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
    render() {
        let st = { margin: '8px auto', height:'100%'}
        return (
            <div style={{ display: "flex", display: "-webkit-flex", flexFlow: "column wrap" ,}}>                       
                <Marked text={this.state.text} textChange={v => this.textChange(v)} style={st} height="100px" toolbarOptions={toolbarOptions} />
                <Button type="primary" style={{...st}} onClick={() => this.onPublish()}>发表评论</Button>
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
         changeArticleId: (id) => dispatch(articleAction(id))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddComment))