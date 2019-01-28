# 安装
所用的node版本为v8.10.0,npm版本为5.6.0。

```
npm i
```

# 开发
```
npm run start
```

# 发布
```
npm run build
```

# 查看发布
启动一个本地的静态资源服务器，将dist目录作为静态资源网站运行。
```
npm run server
```

# 介绍
### 项目框架
* [react](https://reactjs.org/)：视图；
* [dva@2](https://github.com/sorrycc/blog/issues/48)：数据流，dva@2抽取了dva-core，dva-core包含[redux](https://github.com/reactjs/redux)和[redux-saga](https://github.com/redux-saga/redux-saga)；
* [dva-no-router](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)：无路由版本的dva，用来将dva-core和react联系起来；
* [umi](https://umijs.org/)：脚手架工具和路由;
* [antd](https://ant.design/docs/react/introduce-cn/)：页面组件库；
* [Mock.js](http://mockjs.com/)：数据mock，生成随机数据，拦截 Ajax 请求；
* [serve.js](https://github.com/zeit/serve)：静态资源服务器，查看发布后的结果；

### 目录结构
按照umi的约定，目录结构如下
```
.
├── dist/                          // 构建产物目录
├── mock/                          // 数据mock放这里
├── public/                        // ??
└── src/                           // 源码目录，可选，把里面的内容直接移到外面即可
    ├── assets/                    // 图片等
    ├── models/                    // 公共model
    ├── service/                   // 公共service
    ├── themes/                    // 公共样式
    ├── components/                // 公共components
             ├── custome.less      // 自定义样式、覆盖antd样式
             ├── default.less      // 覆盖antd的less变量
             ├── site.less         // 当前网站的自己写的样式
    ├── layouts/
    │   └── index.js              // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── pageA/                 // 某个A页面
             ├── components/       // A页面的子组件,只有A用到就放这里,否则放src/components
             ├── service/          // A页面的service,只有A用到就放这里,否则放src/services
             ├── models/           // A页面的model,只有A用到就放这里,否则放src/models
             ├── page.js           // A页面的容器组件
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── _routes.json               // 路由配置，和文件路由二选一
├── test/                          // 测试用例放这里
├── .eslintrc.js                   // eslint 配置
├── .umirc.js                      // umi 配置
├── .umirc.mock.js                 // umi 数据mock配置
├── .webpackrc                     // webpack 配置
└── package.json
```

### 重要的约定
1. umi 约定 layouts/index.js 为整体布局文件。
2. umi 约定 pages/ 目录为页面目录，文件的层级关系即为路由关系。 目录下如果有 index.js，则作为路由解析。  
3. models，分为global model和page model，详见：https://github.com/umijs/umi/issues/171
4. mock文件，接口URL一律在前面加上“mock”；详见下面“关于数据请求”部分。
5. service的请求，想要取mock数据需要在开头加上“/mock”；详见下面“关于数据请求”部分。
6. 要做到按需加载，需要用上路由，切换路由会加载对应的page和model等。

### 有关资料
1. [dva的数据流向等8个概念](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md)；
![enter description here][1]

2. [dva知识导图](https://github.com/dvajs/dva-knowledgemap)，包含 ES6, React, dva 等所有基础知识；
 2.1 [react的组件之间的数据传递](https://github.com/dvajs/dva-knowledgemap#props)，主要分为两种：
 父组件通过props向子组件传递数据；
 ![enter description here][2]
 子组件通过调用父组件传递下来的函数来给父组件传递数据。
 ![enter description here][3]
 2.2 [CSS Modules](https://github.com/dvajs/dva-knowledgemap#%E7%90%86%E8%A7%A3-css-modules)  
![enter description here][4]

### 常用插件
* 日期格式化：[Moment.js](http://momentjs.cn/)
* css类名：[classnames](https://www.npmjs.com/package/classnames)

### 开发用chrome插件推荐：
不翻墙（不保证最新版，需要最新版自行google）：
* [Redux DevTools](https://www.crx4chrome.com/crx/31540/)
* [React Developer Tools](https://www.crx4chrome.com/crx/3068/)



### 关于数据请求
* 只想请求自己写的mock数据，注释掉".webpackrc.js"里面的proxy属性，请求地址的api前面写mock
 ```
export default {
  "theme": "./theme.config.js",
  // "proxy": {
  //   "/api": {
  //     "target": "http://jsonplaceholder.typicode.com/",//开发服务器地址
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api" : "" }
  //   }
  // }
}
```
```
//假设开发服务器的接口是“/api/users”；
export function fetch({ page = 1 }) {
  return request(`/mock/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
```

* 只请求开发服务器的数据，配置".webpackrc.js"里面的proxy属性，假设开发服务器为（http://jsonplaceholder.typicode.com），
去掉请求地址的api前面的mock
```
export default {
  "theme": "./theme.config.js",
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",//开发服务器地址
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
```
```
//假设开发服务器的接口是“/api/users”；
export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
```

* 两者混合，某些接口用mock，某些用服务器数据
```
export default {
  "theme": "./theme.config.js",
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",//开发服务器地址
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
```
```
//取开发服务器的数据
export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
//取mock的数据
export function fetch({ page = 1 }) {
  return request(`/mock/api/list?_page=${page}&_limit=${PAGE_SIZE}`);
}
```

* 生产环境的数据请求，在Nginx里面进行配置，如果是api开头的则由Nginx转发到对应服务器地址，不是api开头则表示是
一般的静态资源。（不用Nginx转发直接在页面请求会有跨域问题，则需要考虑jsonp或其他方案。）

### 数据接口
* 数据直接在响应实体里面，数据状态常用状态码如下（下面的前端会存个枚举，如果返
回的状态码不在下列之中，用后端返回的状态码说明文字）：
  ```
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  ```
  前端会根据上面这个弹出对应的错误提示。
  
* 常用数据结构
	```
	//表格数据
	{
		list:[{},{},...], //数据列表
		pagination:{
			current:1, //当前页
			pageSize:10, //每页显示数据条数
			total:100, //总条数
		}
	}
	
	//树
	[{
	  key:1,
	  title:"t1",
	  children:[{
	    key:11,
	    title:"t11"
	  },{},...]
	},...]
	
	//菜单
	[{
	  name:"ABC",
	  path:"/ABC",
	  children:[{
	    name:"ABC",
      path:"/ABC",
    },{},{},...]
	},{},...]

	```
	
### 权限
权限分为几个部分：访问权限、数据权限、按钮显示；

1. 访问权限
   
   根据http响应行状态码判定
   ```
   401：表示没有登录或者登录失效，前端会退出系统并跳转到登录页。
   403：表示已经登录，但没有权限访问当前资源，前端会跳转到403提示页面。
   ```

2. 数据权限
   
   比如用户不能看到列表中的某些项，这个由后端来控制返回的数据就好了。
   可能包括列表数据，菜单数据等。
   
3. 按钮显示

    用户登录后访问系统，会请求一个权限接口，拿到该用户拥有的权限列表，然后在页面内进行匹配，如果
    某个按钮的权限该用户拥有则显示，否则隐藏。（前端需要一个专用的验证模块来做这个事）

    
  	
  	

  [1]: docs/dva-1.png
  [2]: docs/dva-props-1.png
  [3]: docs/dva-props-2.png
  [4]: docs/dva-css-modules.png

  
