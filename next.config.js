/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const path = require("path");
// 网站域名
const WebDomainObj = {
  dramabox: {
    //test: 'http://192.168.1.70:8099',
    staging: 'https://vextermovies.vercel.app',
    prod: 'https://vextermovies.vercel.app'
  },
  dramaboxapp: {
    //test: 'http://192.168.1.71:3001',
    staging: 'https://vextermovies.vercel.app',
    prod: 'https://vextermovies.vercel.app'
  }
}
// 网站服务api
const BaseUrlObj = {
  // test: 'http://192.168.0.253:8080',
  //test: 'http://192.168.0.253:8080', // http://192.168.1.70:8080
  //staging: 'https://yfbwww.webfic.com',
  prod: 'https://www.webfic.com'
}
// ipua
const IpUaUrlObj = {
  // test: "https://hotdrama.hw.dzods.cn/drama-box/ad/cache/ua",
  //test: 'https://drama.hw.dzods.cn/drama-box/ad/cache/ua',
  staging: 'https://yfbapi.dramaboxdb.com/drama-box/ad/cache/ua',
  prod: 'https://api.dramaboxdb.com/drama-box/ad/cache/ua'
}

/** ⬇⬇⬇⬇⬇⬇✨✨✨✨✨✨ 环境,手动更换 ✨✨✨✨✨✨⬇⬇⬇⬇⬇⬇*/
const environment = 'prod'; // 部署环境 "test" | "staging" | "prod"
const Platform = 'dramaboxapp'; // 产品线 "dramabox" | "dramaboxapp"
/** ⬆⬆⬆⬆⬆⬆✨✨✨✨✨✨ ℹℹℹℹℹℹℹℹℹℹ ✨✨✨✨✨✨⬆⬆⬆⬆⬆⬆ */

const buildId = `${Platform}_20240316`; // 构建ID
const WebDomain = WebDomainObj[Platform][environment];
const BaseUrl = BaseUrlObj[environment]
const IpUaUrl = IpUaUrlObj[environment]
process.title = `next-${buildId}`;

console.log('\x1B[44m%s\x1B[49m', '-------------------------- ✨ ✨ ✨ ✨ ✨ ✨ --------------------------')
console.log('\x1B[34m%s\x1B[39m', '部署环境:', environment, '构建ID:', buildId)
console.log('\x1B[34m%s\x1B[39m', '网站域名:', WebDomain)
console.log('\x1B[34m%s\x1B[39m', 'API:', BaseUrl)
console.log('\x1B[34m%s\x1B[39m', 'IPUA:', IpUaUrl)
console.log('\x1B[44m%s\x1B[49m', '-------------------------- ✨ ✨ ✨ ✨ ✨ ✨ --------------------------')

const nextConfig = {
  reactStrictMode: true,
  // Configuring the Build ID
  generateBuildId: async () => {
    return buildId;
  },
  transpilePackages: ['antd-mobile'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "${Platform}.module.scss";`
  },
  // 内置多语言
  i18n,
  // https://www.nextjs.cn/docs/upgrading
  swcMinify: true,
  images: { // 远程图片资源域名
    domains: [
      "reshot.hw.dzods.cn",
      "res.dramabox.com",
      "vres.dramaboxdb.com",
      "sres.dramaboxdb.com",
      "nas2osstest.wpzkj.cn",
      "nchapter.dramaboxdb.com",
      "dzztstgvideo.cbread.cn",
      "nvideo.dramaboxdb.com",
      "nakavideo.dramaboxdb.com",
      "nawsvideo.dramaboxdb.com"
    ],
  },
  // 环境配置
  env: {
    BaseUrl,
    WebDomain,
    IpUaUrl,
    Platform
  },
  // 参考 https://nextjs.org/docs/messages/swc-disabled
  // experimental: {
  //   forceSwcTransforms: true,
  // },
}

module.exports = nextConfig;

