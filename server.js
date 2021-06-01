const fs = require('fs')
const path = require('path')
// 缓存模块: 按读取频率最低的移除
const LRU = require('lru-cache')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
// node 压缩中间件
const compression = require('compression')
const microcache = require('route-cache')
const favicon = require('serve-favicon')
const { createBundleRenderer } = require('vue-server-renderer')
const cookieParser = require('cookie-parser')
const ip = require("address");
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version} `;
const { loggerLog, loggerError, loggerInfo, logUse } = require('./lib/log.js');
const app = express();

// CDN封装
// const cdnReset = require('./build/cdn-path-reset.js')

app.use(cookieParser())
const { createProxyMiddleware } = require('http-proxy-middleware');
let renderer
let readyPromise
const templatePath = resolve('./index.template.html');

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        // 组件级别缓存
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }))
}

// 生产环境执行方法
function renderFile() {
    loggerLog("#########生产环境运行>>>")
    const template = fs.readFileSync(templatePath, 'utf-8') // 模板文件
    const bundle = require('./dist/vue-ssr-server-bundle.json') // 服务端打包
    const clientManifest = require('./dist/vue-ssr-client-manifest.json') // 前端清单，加载js静态资源等
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
}

if (isProd) {
    renderFile();
} else {
    loggerLog("#########开发环境运行>>>")
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
}

// 静态文件处理，加了缓存时间,不处理的话，前端动态加载资源加载不到
const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 3 : 0
})

app.use(compression({ threshold: 0 }))
app.use(favicon('./static/favicon.ico'))
app.use('/dist', serve('./dist', true))
app.use('/static', serve('./static', true))

// WorkService
// app.use('/sw.js', serve('./dist/sw.js', true))

// 如果内容不是用户特定 (user-specific)
//（即对于相同的 URL，总是为所有用户渲染相同的内容），
// 我们可以利用名为 micro-caching 的缓存策略，
// 来大幅度提高应用程序处理高流量的能力。
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

const HOST = process.env.HOST || "http://internal-hwyc-elb-for-newm-124074560.ap-southeast-1.elb.amazonaws.com/"
const options = {
    target: HOST, // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
        // '^/webfic': '/webfic'
        '^/webfic': '/asg/portal'
    },
    onProxyRes(proxyRes, req, res) {
        console.log(proxyRes)
        loggerLog('响应结果')
    },
    onError(err, req, res) {
        try {
            loggerError(`代理错误:${err},${req.url}`)
        } catch (error) {
            console.log(error)
        }

    },
    onProxyReq(proxyRes, req, res) { }
};
const exampleProxy = createProxyMiddleware(options);
app.use('/webfic', exampleProxy)

async function render(req, res) {
    const s = Date.now()
    res.setHeader("Content-Type", "text/html;charset=utf-8")
    res.setHeader("Server", serverInfo)
    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            // 编译页面报错
            loggerError(`ssr编译报错 : ${req.url},${err.stack}`)
            // res.redirect('/public/500.html')
        }
    }

    const context = {
        url: req.url,
        cookies: req.cookies
    }

    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    loggerInfo(`***当前页面信息${req.url}----${req.rawHeaders && req.rawHeaders.join(',')}`)
    renderer.renderToString(context, (err, html) => {

        // 线上CDN链接替换
        // if (isProd) { html = resetCdn(html) }

        if (err) {
            return handleError(err)
        }

        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s} ms`)
        }
    })
}

function resetCdn(filedata) {
    if (!filedata) return;
    if (!process.env.TYPE_CDN) return filedata;
    let cdn = 'static1' // ssr
    if (process.env.TYPE_CDN !== 'line') cdn = 'yfbstatic'
    const distPath = `https://${cdn}.webfic.com/dist`
    return filedata.replace(
        // /(<script[^<>]*src=\")((?!http|https)[^<>\"]*)(\"[^<>]*>[^<>]*<\/script>)/ig,
        /(<script[^<>]*src=\")((?!http|https)[^<>\"]*)(\"[^<>]*>[^<>]*<\/script>)/ig,
        `$1${distPath}$2$3`
    ).replace(
        /(<link[^<>]*href=\")((?!http|https)[^<>\"]*)(\"[^<>]*>)/ig,
        `$1${distPath}$2$3`
    ).replace(
        /\/dist\/dist/ig,
        '/dist'
    )
}

logUse(app); //  请求日志

/*  sw
app.get("/sw.js", (req, res) => {
    let swContent = fs.readFileSync(path.resolve(__dirname, './dist/sw.js'), 'utf-8');
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    res.send(swContent);
}) */

// 访问服务响应状态
app.get('/pc-online', (req, res) => {
    req.header('Access-Control-Allow-Origin', '*')
    req.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Content-Length, Accept, User-Agent, x-access-token, version, package-name'
    )
    req.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    )
    res.send({
        message: 'I online',
        status: 'success'
    })
});

// 在服务器处理函数中，调用 render 函数，不匹配服务端路由，交给vue的router处理
app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})

const loclhost = ip.ip() || 'localhost';
app.set('port', process.env.PORT || 8090)
app.listen(app.get('port'), () => {
    loggerLog(`Server running at http://${loclhost}:${app.get('port')}`)
})