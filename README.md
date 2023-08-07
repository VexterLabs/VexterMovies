## 【SEO系列】Drama Box
SSR

## 环境
```
// 测试环境jenkins
http://192.168.0.60:1808/jenkins/view/HWYC-TEST_QAT/job/TEST-haiwai_dramabox_ssr_qat/
// 测试域名
http://192.168.1.70:3000
// 预发布域名

// 线上域名
https://www.dramabox.com/
```

## 本地调试部署
```
1. yarn install
// 本地调试
2. yarn dev
// 打包 .next 和 生成sitemap地图
3. yarn build
// next服务 读取文件.next 和 public文件
4. yarn start
```

## 目录
```
项目
├─ .next // build生成文件
├─pages // 以动态路由页面为主，尽可能少处理客户端逻辑
├─public // 放置静态资源文件，字体、图片、语言啥的
├─components // 组件代码
├─server // 服务api
├─store // 状态管理
├─hooks // 自定义hook
├─utils // 共用函数、参数
├─style // 页面级样式，不放拉到
├─typings // 声明文件、ts类型文件
├─client.config.ts // 全局配置网站参数，拉书相关
├─next.config.js // next环境配置
├─dz-next-log.config.js // 生产环境log日志 & 钉钉报警配置
├─next-i18next.config.js // 给next.config.js提供语言参数配置
└─package.json
```
