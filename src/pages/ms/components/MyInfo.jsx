import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux'
import { refreshUserInfoAction, PATH, NOLOGIN ,loginStateAction} from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { Upload, Button, Icon, Avatar } from 'antd';
import {Badge} from 'antd-mobile'
import { Tabs } from 'antd';
import txtp from '../../../../src/res/img/zhtp.png'
import ArticleList from './userinfo/ArticleList';
import API from '../../../utils/API';
import AdmireList from './userinfo/AdmireList';
const TabPane = Tabs.TabPane;

class MyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            userInfo: props.userInfo,
            uploading: false
        }
    }
    componentDidMount(){
        if (!this.props.loginState) {
            this.props.history.push("/ms/login")
        }
    }

    onClick() {
        let userInfo = this.state.userInfo
        if (userInfo) {
            if (this.state.fileList.length == 0) {
                message.info("请选择照片")
            }
            const { fileList } = this.state;
            const formData = new FormData();
            formData.append('file', fileList[0]);
            this.setState({
                uploading: true,
            });
            API.upload(formData).then(data => {
                API.addImg(data, userInfo.id).then(newData => {
                    message.info('操作成功');
                    this.setState({
                        uploading: false, fileList: []
                    });
                    this.props.refreshUserInfoState(userInfo.id)
                }).catch(err => {
                    this.setState({ uploading: false })
                    if (NOLOGIN === err) {
                        this.props.changeLoginState(false)
                    } else {
                        message.info('上传错误');
                    }
                })
            }).catch(err => {
                this.setState({ uploading: false })
                if (NOLOGIN === err) {
                    this.props.changeLoginState(false)
                } else {
                    message.info(err);
                }
            })
        }

    }
    loginOut(){
        this.props.loginOut()
        this.props.history.push("/ms/login")
    }
    render() {
        let userInfo = this.props.userInfo
        if (!userInfo) {
            return <div></div>
        }
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        let edti = null
        if (this.props.loginState) {
            edti = <div  >
                <Upload {...props}>
                    <Button >
                        <Icon type="upload" /> 编辑
                </Button>
                </Upload>
                <Button
                    type="ghost"
                    onClick={() => this.onClick()}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{marginTop:"5px"}}
                >
                    {uploading ? '上传中...' : '开始上传'}
                </Button>

            </div>

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
                        {edti}
                        <div>{userInfo.name}{userInfo.nickname}    </div>
                        <div>{userInfo.phone}</div>
                        <Badge text="退出登陆" hot='true' style={{ marginLeft: 12,color:'#662388' }} onClick={()=>this.loginOut()}/> 
                    </div>

                </div>

                <Tabs defaultActiveKey="1" style={{ paddingTop: "250px"}}>
                    <TabPane tab="我的文章" key="1"><ArticleList userId={userInfo.id} showDelet={true} showUpdate={true} /></TabPane>
                    {/* <TabPane tab="关注" key="2">Tab 2</TabPane> */}
                    <TabPane tab="喜欢" key="3"><AdmireList /></TabPane>
                </Tabs>
            </div>


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
        refreshUserInfoState: (data) => dispatch(refreshUserInfoAction(data)),
        loginOut: () => dispatch(loginStateAction(false)),
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyInfo))