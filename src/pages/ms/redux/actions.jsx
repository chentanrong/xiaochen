import API from "../../../utils/API"
import Cookies from 'js-cookie'
import { message } from 'antd';
export const NOLOGIN = 'NOLOGIN'
export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE'
export const USER_INFO = 'USER_INFO'
export const CHANGE_ARTICLE = 'CHANGE_ARTICLE'
export const USER_INFO_STATE = 'USER_INFO_STATE'
export const ARITCLE_STATE = 'ARITCLE_STATE'

export const COMMENT_TYPE = 'COMMENT'

export const PATH  ='/api'
export const articleAction = (data) => ({
    type: CHANGE_ARTICLE,
    data: data
})
export const userInfoAction = (data) => ({
    type: USER_INFO,
    data: data
})
export const userInfoStateAction = (data) => ({
    type: USER_INFO_STATE,
    data: data
})

export const loginStateAction = (data) => ({
    type: CHANGE_LOGIN_STATE,
    data: data
})

export const  articleListStateAction = (data) => ({
    type: ARITCLE_STATE,
    data: data
})
export const loginAction = (username, password) => {
    return function (dispatch, getState) {
        API.login(username, password).then(data => {        
            dispatch(userInfoAction(data))
            dispatch(loginStateAction(true))
        }).catch(err => {
            if (NOLOGIN === err) {
                dispatch(loginStateAction(false))
            } else {
                message.info(err);
            }
        })
    }
}
export const refreshUserInfoAction = (id) => {
    return function (dispatch, getState) {
        API.getUser(id).then(data => {
            dispatch(userInfoAction(data))
        }).catch(err => {
            if (NOLOGIN === err) {
                this.props.changeLoginState(false)
            } else {
                message.info(err);
            }
        })
      
    }
}



