import React, { Component } from 'react';

import { connect } from 'react-redux'
import { userInfoStateAction, PATH,NOLOGIN } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { Avatar,Tabs ,message} from 'antd';

import txtp from '../../../../src/res/img/zhtp.png'
import ArticleList from './userinfo/ArticleList';
import API from '../../../utils/API';


const TabPane = Tabs.TabPane;

class UserInfo extends Component {
    constructor(props) {
        super(props);
        let loactionDtate = this.props.location.state
        let { id } = loactionDtate
        this.state = {
            id: id,
            userInfo:undefined
        }    
    }

    componentDidMount(){   
        if(this.state.id){
            API.getUser(this.state.id).then(newdata => {
                this.setState({
                    userInfo:newdata,            
                });
            }).catch(err => {
                if (NOLOGIN === err) {
                    this.props.changeLoginState(false)
                } else {
                    message.info(err);
                }
            })
        }
       

    }
 
    render() {
        let userInfo = this.state.userInfo
        if(!userInfo){
            return <div></div>
        }
        return (
            <div style={{ textAlign: 'center', margin: '0 auto', fontSize: '18px' ,zIndex:0}}>
            <div style={{ position: "relative" }}>
                <div style={{
                    background: `url(${userInfo.img ? `${PATH}${userInfo.img.path}` : ""})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: "250px",
                    padding: "12px",
                    textAlign: "center",
                    WebkitFilter: "blur(15px)",
                    MozFilter: "blur(15px)",
                    OFilter: "blur(15px)",
                    MsFilter: "blur(15px)",
                    filter: "blur(15px)",
                    position: "absolute",
                    width: "100%"
                }} />
                <div style={{ position: "absolute", width: "100%", height: "250px", zIndex:2 }}>
                    <Avatar src={userInfo.img ? `${PATH}${userInfo.img.path}` : txtp} size={78} style={{ marginBottom: "10px" }} />
                    {/* {edti} */}
                    <div>{userInfo.name}{userInfo.nickname}</div>
                    <div>{userInfo.phone}</div>
                </div>

            </div>

                {/* <Avatar src={userInfo.img?`${PATH}${userInfo.img.path}`:txtp} size={78}/>           
                <div >
                    <div>{userInfo.name}{userInfo.nickname}</div>
                    <div>{userInfo.phone}</div>
                </div> */}
                <Tabs defaultActiveKey="1"  style={{ paddingTop: "250px"}}>
                    <TabPane tab="文章" key="1"><ArticleList userId={this.state.id} /></TabPane>
                    {/* <TabPane tab="关注" key="2">Tab 2</TabPane>
                    <TabPane tab="喜欢" key="3">Tab 3</TabPane> */}
                </Tabs>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        loginState: state.app.loginState,
        userInfoState: state.app.userInfoState,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfoState: (data) => dispatch(userInfoStateAction(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo))