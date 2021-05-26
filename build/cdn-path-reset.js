/***
 *
 * 预发布 线上打包结束前, 把静态资源地址替换为相关CDN地址
 * 测试环境不做处理, 静态资源为'/'
 *
*/
const fs = require("fs");
const path = require("path");
const join = require('path').join;
const staticPath = "https://static.goodnovel.com/dist/static"
const distPath = "https://static.goodnovel.com/dist"

// 一个 JavaScript 命名函数。
function CDNPathRest(isProd) {
  this.isProd = isProd;
};

// 替换html中资源链接
function resetCdn(that, filedata) {
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

// fsRW  fs读写文件
function fsRW(that, htmlpath) {
  fs.readFile(htmlpath, { encoding: 'utf-8' }, (err, filedata) => {
    if (err) {
      console.log("CG: readFile filed," + htmlpath);
    } else {
      filedata = resetCdn(that, filedata);
      fs.writeFile(htmlpath, filedata, { encoding: 'utf-8' }, (err) => {
        if (err) {
          console.log("CG: write file failed:" + htmlpath);
        }
      })
    }
  })
}

// 查找hwyc内所有html
function handleListHtmlPath(containPath) {
  let Files = [];
  function getFile(containPath) {
    let files = fs.readdirSync(containPath);
    files.forEach((item, index) => {
      let fPath = join(containPath, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() == true) {
        getFile(fPath);
      } else {
        if (fPath.includes('index.html')) {
          Files.push(fPath);
        }
      }
    })
  }

  getFile(containPath)
  // console.log(Files);
  return Files;
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
CDNPathRest.prototype.apply = function (compiler) {
  let that = this;
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('done', function (compilation /* 处理 webpack 内部实例的特定数据。*/) {
    // console.log("^^^^^^^生产命令: ", that.isProd);

    if (!that.isProd) {
      // console.log("测试环境,不做CDN替换");
      return;
    }
    let CDNPath = 'https://static.goodnovel.com'
    // console.log("替换CDN地址: "+CDNPath);

    let tmpHtml = path.join(__dirname , '../dist')

    // 读取目录中内容
    let htmlPathList = handleListHtmlPath(tmpHtml);

    htmlPathList.forEach((htmlpath, index) => {
      if (htmlpath) {
        fsRW(that, htmlpath);
      }
    })

  });
};

module.exports = CDNPathRest;
