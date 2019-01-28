import { combineReducers } from 'redux'
import {
    CHANGE_LOGIN_STATE, USER_INFO, CHANGE_ARTICLE, USER_INFO_STATE, ARITCLE_STATE
} from './actions'
const appInitialState = {
    title: '小陈博客',
    open: false,
    loginState: false,
    userInfo: {
        "id": "",
        "name": "",
        "nickname": "",
        "phone": "",
    },
    articleListState: {
        path: "queryArticleOrderByDate",
        search: '',
        page: 0
    },
    artcleId: undefined,
    userInfoState: {
        userId: undefined
    }
}
const serverInitialState = {


}

function appReducer(state = appInitialState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_STATE:
            return { ...state, loginState: action.data }
        case USER_INFO:
            return { ...state, userInfo: action.data }
        case CHANGE_ARTICLE:
            return { ...state, artcleId: action.data }
        case USER_INFO_STATE:
            return { ...state, userInfoState: action.data }
        case ARITCLE_STATE:
            return { ...state, articleListState: action.data }

        default:
            return state
    }
}
function serverReducer(state = serverInitialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
const rootReducer = combineReducers({
    app: appReducer, server: serverReducer,
})

export default rootReducer