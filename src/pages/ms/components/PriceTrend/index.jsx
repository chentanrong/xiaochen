import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux'
import { Table, Divider, Tag } from 'antd';
import 'moment/locale/zh-cn';
import API from '../../../../utils/API';
import { NOLOGIN ,loginStateAction} from '../../redux/actions';
import { withRouter } from 'react-router-dom';

const columns = [{
    title: '标题',
    dataIndex: 'articleTitle',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '摘要',
    dataIndex: 'articleViews',
}, {
    title: '喜欢',
    dataIndex: 'articleLikeCount',
}, {
    title: '发布时间',
    dataIndex: 'articleDate',
}];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

 class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:undefined
        }
    }

    componentDidMount(){
        this.query()
    }
    query(){
        API.queryArticleOrderByDate().then(data => {         
            this.setState({data:data.items})
        }).catch(err => {
            if (NOLOGIN === err) {
                this.props.changeLoginState(false)
            } else {
                message.info(err.message);
            }
        })
       
    }
    render() {
        let data=this.state.data
        return (
            <Table  columns={columns} dataSource={data} />//rowSelection={rowSelection}
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: (b) => dispatch(loginStateAction(b))
    }
}

export default withRouter(connect( mapDispatchToProps)(Index))