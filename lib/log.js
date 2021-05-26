//log.js文件
const log4js = require('log4js');
const path = require('path');
//自己的配置文件
const config = require('./email.js');
//公共路径
const pubPath = path.resolve(process.cwd() + '/logs');
log4js.configure({
    appenders: {
        stdout: {
            //控制台输出
            type: 'stdout',
        },
        request: {
            //请求日志
            type: 'dateFile',
            filename: pubPath + '/request/', // 需要手动建好目录,如图1所示
            // maxLogSize: 1024,// 只在 type: 'file' 中才支持
            // 指定pattern后无限备份
            pattern: 'yyyy-MM-dd.log',
            // 不指定pattern时若为true会使用默认值'.yyyy-MM-dd'
            alwaysIncludePattern: true,
        },
        //http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息 
        httpLog: {
            type: "dateFile",
            filename: pubPath + "/http/",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
        },
        error: {
            //错误日志
            type: 'dateFile',
            filename: pubPath + '/error/',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        other: {
            //其他日志
            type: 'dateFile',
            filename: pubPath + '/other/',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        email: {
            //发送错误报告至邮箱
            type: '@log4js-node/smtp',
            sender: config.email.auth.user, // 发送邮件的邮箱
            subject: '海外阅读PC栈项目线上预警', //标题
            SMTP: {
                host: config.email.host, //smtp.qq.com 这里我使用了QQ邮箱，你可以换成其他
                port: 465,
                auth: config.email.auth, //auth { user: 'xxx@qq.com', pass: '密码' }
            },
            recipients: config.email.recipients, //接收邮件的邮箱
        },
    },
    categories: {
        //default 当你使用log4js.getLogger(level)，level不传，默认使用default
        //appenders: [], 可以放入上面配置过的对象
        default: { appenders: ['stdout'], level: 'trace' },
        other: { appenders: ['other'], level: 'info' },
        loger: { appenders: ['httpLog'], level: 'info' },
        error: { appenders: ['stdout', 'error'], level: 'error' }, // 'email' 邮箱通知暂时关闭

    },
});

//请求日志记录
exports.loggerLog = (message) => {
    log4js.getLogger('default').trace(message);
};

//其他日志记录
exports.loggerInfo = (message) => {
    log4js.getLogger('other').info(message);
};

//错误日志记录
exports.loggerError = (message) => {
    log4js.getLogger('error').error(message);
};


exports.logUse = function(app) {
    var logger = log4js.getLogger('loger');
    // logger.setLevel('INFO'); //设置输出级别，具体输出级别有6个，见下方说明
    //页面请求日志, level用auto时,默认级别是WARN
    app.use(log4js.connectLogger(logger, { level: 'info', format: ':method :url :status' }));
}