import { FetchHelper } from 'freesia-core'
import { NOLOGIN } from '../pages/ms/redux/actions';

class API {

    //上传文件
    static upload(formData) {
        return new Promise((resolve, reject) => {
            let request = new Request('/api/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
            fetch(request).then(res => res.json())
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //登录
    static login(name, password) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson('/api/login', { name, password })
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //获取用户信息
    static getUser(id) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/getUser?userId=${id}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    
    //推荐文章
    static queryArticleOrderByDate(page) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/queryArticleOrderByDate?page=${page || 0}&size=10`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }

    //查询文章
    static queryArticleByPage(path,page,index) {//
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/${path}?page=${page || 0}&size=10&index=${index}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //我的文章
    static getArticleByUser(page, userId) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/getArticleByUser?page=${page || 0}&userId=${userId}&size=10`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //推荐文章
    static queryArticleById(id) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/queryArticleById?id=${id}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //添加文章
    static addArticle(model) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/addArticle.do`, model)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
     //编辑文章
     static updateArticle(model) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/updateArticle.do`, model)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //添加评论
    static addComment(content, parentId, imge) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/addComment.do?content=${content}&parentId=${parentId}&imge=${imge}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //评论列表
    static queryCommentByParent(page, parentId) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/queryCommentByParent?page=${page || 0}&parentId=${parentId}&size=10`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //登录
    static login(name, password) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson('/api/login', { name, password })
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //注册
    static register(name, password,email,code) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/register?name=${name}&email=${email}&password=${password}&code=${code}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
     //获取Code
     static getCode(email) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/getCode?email=${email}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //添加图片
    static addImg(path, hostId) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/addImg?path=${path}&hostId=${hostId}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }

    //喜欢列表
    static getAdmireArticles(page) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/getAdmireArticles?page=${page || 0}&size=10`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //添加喜欢
    static addArticleAdmire(admiredId) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/addArticleAdmire.do?admiredId=${admiredId}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //添加喜欢
    static addAdmire(admiredId,type) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/addAdmire.do?admiredId=${admiredId}&type=${type}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    //取消喜欢
    static deleteAdmire(admiredId) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/deleteAdmire.do?admiredId=${admiredId}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
      //取消喜欢
      static deleteArticle(articleId) {
        return new Promise((resolve, reject) => {
            FetchHelper.postJson(`/api/deleteArticle.do?articleId=${articleId}`)
                .then(json => {
                    if (this.needLogin(json)) {
                        reject(NOLOGIN)
                    } else {
                        if (json.success === true) {
                            resolve(json.data)
                        } else {
                            reject(this.errorMeaasge(json.message))
                        }
                    }
                }).catch(error => {
                    reject(this.responseError(error))
                })
        })
    }
    static needLogin(res) {
        return res.status === 401
    }
    static needLoginError() {
        return { message: `请先登陆` }
    }
    static responseError(res) {
        return  `服务器状态:${res.status}` 
    }
    static errorMeaasge(message) {
        return  message 
    }
}
export default API