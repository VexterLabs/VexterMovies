**阅读**:

### 配置文件
``` json
"scripts": {
    "dev": "npm start",
        "start": "cross-env PORT=9080 HOST=http://reshot.xintaiae.cn node server.js", // wwwhot.xintaiae.cn
        "server:ptest": "cross-env NODE_ENV=production PORT=9080 HOST=http://reshot.xintaiae.cn pm2 start server.js --name test",
        "server:pyfb": "cross-env NODE_ENV=production PORT=9080 HOST=http://internal-hwyc-elb-for-yfb-newm-478091964.ap-southeast-1.elb.amazonaws.com/ pm2 start server.js --name yfb",
        "server:ponline": "cross-env NODE_ENV=production PORT=9080 HOST=http://internal-hwyc-elb-for-newm-124074560.ap-southeast-1.elb.amazonaws.com/ pm2 start server.js --name online",
        "build": "rimraf dist && npm run build:client && npm run build:server",
        "build:client": "cross-env NODE_ENV=production webpack --color --config build/webpack.client.config.js --progress --hide-modules",
        "build:server": "cross-env NODE_ENV=production webpack --color --config build/webpack.server.config.js --progress --hide-modules"
}
```

**本地的开发运行步骤：**

``` bash
cd haiwai_pc_ssr

# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:9080
npm run dev
```

**线上部署**

服务器环境依赖：
node >= V10.8.0
npm >= V6.2.0
pm2 >= V4.4.0

拉取代码安装代码依赖

```bash
# 安装依赖
npm install

# build for production（打包）
npm run build

# serve in yfb mode（运行测试环境, 端口号 9080， node服务name=ptest）
npm run server:ptest

# serve in yfb mode（运行预发布环境,端口号 9080, node服务name=pyfb）
npm run server:pyfb

# serve in production mode（运行生产环境，端口号 9080， node服务name=ponline）
npm run server:ponline
```

建议每次打包都先删除`node_modules`、`package-lock.json`文件在执行上线操作

更新代码完成后，需要重启node服务，

```bash
# 关闭服务
pm2 stop 服务名称(ptest pyfb ponline)

# 删除服务
pm2 delete 服务名称(ptest pyfb ponline)

# serve in yfb mode（运行测试环境）
npm run server:ptest

# serve in yfb mode（运行预发布环境,端口号 9080, node服务name=yfb）
npm run server:pyfb

# serve in production mode（运行生产环境，端口号 9080， node服务name=online）
npm run server:ponline


```

线上打包运行只用到`node_modules`、`dist`、 `lib`, `static`, `babelrc`, `index.template.html`、`package.json`、`server.js` 相关文件

### 项目开发事项

1、缓存策略

**页面级别缓存**，如果内容不是用户特定 (`user-specific`)（即对于相同的 URL，总是为所有用户渲染相同的内容），我们可以利用名为 `micro-caching` 的缓存策略，来大幅度提高应用程序处理高流量的能力。

**组件级别缓存**，`vue-server-renderer` 内置支持组件级别缓存 (`component-level caching`)。要启用组件级别缓存，你需要在创建 `renderer` 时提供具体缓存实现方式(`cache implementation`)。典型做法是传入 `lru-cache`。

2、使用 `serve-favicon` 中间件，从服务端来提供网页标签页的小 `logo`。

3、动态 `title`(当前为使用动态title)

我们动态生成 `title` ，然后判断是服务端还是客户端，分别在各自对应的钩子函数，完成网页 `title` 的赋值操作（如果是服务端就在 `created` 钩子函数中，如果是客户端就是 `mounted` 钩子函数中）。然后使用 `Vue.mixin()` 将钩子函数混入。

4、Head 管理

使用相同的策略，你可以轻松地将此 `mixin` 扩展为通用的头部管理工具 (generic head management utility)。

6、页面更改注意事项

5.1接口处理: 页面添加`asyncData`的方法，将页面请求的数据在此函数内通过调取`vuex`的`dispatch`事件中请求服务端接口，并将数据存放到`vuex`的`state`对象内，在页面引用`vuex`的`state`的相关数据；

5.2客户端内vue的生命周期只能使用`mounted`钩子函数;尽可能避免使用js的副作用api函数，比如：定时器

### 服务监控接口

接口： /pc-online

请求方式： GET

返回值
```json
{"message":"I online","status":"success"}
```


测试账号:
503333844@qq.com/shifufu123456
wangkai@dianzhong.com/wangkai123456
dzceshi002@gmail.com/yy123456
magicanh2dz@gmail.com /Dzce123456
yangchao@dianzhong.com/abc123456
建议： 使用浏览器中的的生命周期控制window等方法的调用
