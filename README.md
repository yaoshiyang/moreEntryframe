## 工程目录
```
├── package.json                 
├── README.md
├── gulpTask                     // 配置gulp任务
│   └── bootstrap                  
├── gulpfile.js                  // gulp 配置文件
├── webpack.config.js            // webpack 配置文件
├── assets                       // 存放公共图片资源
├── dist                         // dist 目录：放置开发时候的临时打包文件
├── bin                          // bin  目录：放置 prodcution 打包文件,zip
├── src                          // 源文件目录
│   ├── html                     // html 目录 
│   │   ├── components           // 存放component的html模板 或者art 模板， gulp  和 webpack 都支持art-template
│   │   ├── index.html
│   │   └── page2.html
│   ├── js                       // js 目录 
│   │   ├── common               // 所有页面的共享区域，可能包含共享组件，共享工具类 JS
│   │   ├── index                 // index 页面 js 目录
│   │   │   ├── components       // 组件的js目录 
│   │   │   │   ├── App.js
│   │   │   ├── index.js         // 每个页面会有一个入口，统一为 index.js
│   │   ├── page2                // page2 页面 js 目录
│   │   │   ├── components
│   │   │   │   ├── App.js
│   │   │   └── index.js
│   └── style                    // style 目录
│       ├── common               // 公共样式区域
│       │   ├── varables.less    // 公共共享变量
│       │   ├── index.less       // 公共样式入口
│       ├── index                 // index 页面样式目录    
│       │   ├── components       // index 页面组件样式目录
│       │   │   ├── App.less 
│       │   ├── index.less       // index 页面样式入口
│       ├── page2                // page2 页面样式目录
│       │   ├── components       
│       │   │   ├── App.less
│       │   └── index.less       
├── vendor                       // 第三方公共库
│   └── bootstrap
│   └── jquery
├── utils                       // 本地工具补充
│   └── apiConfig               // 放入本地api目录
│   └── Cjax                    // 存放的axios的拦截器， 不支持IE8
│   └── Jqjax                   // 存放的jquery的ajax的拦截器
└── └── utils                   // 存放的公共工具
```
## 运行
```
  npm run dev                   // 开发模式
  npm run build                 // 发布模式
```

## 说明

这个工作流程适用于多个页面输入，多个页面输出情形。

## 注意：

* 第一点

    借助于art-template 实现， JS 和 HTML 模板功能。（如果需要支持JSX语法，则需要引入react库）

* 第二点

    html > 

       1.支持模板功能使用的模板是 art-template
       2.会自动生成对应[name].js & [name].css & common.js
       3.也可支持首屏CSS内置，见demo

    js > 

       1.支持模板功能使用的模板是 art-template,管道使用方式，改变见demo
       2.支持ES6，支持ES7部分语法
       3.支持模块化调用。
       4.不支持Style文件解析。
       5.第三方库，通过 webpack中 externals, 然后在html引用cdn ， 这种方式。 考虑到npm 包并未gzip;
       6.支持webpack的watch模式在development模式下，增量构建，稍微优化下webpack
    
    css > 

       1.使用的是less解析，相关功能
       2.如有需求可自我引入postCss解析，比如px -> rem

* 第三点

      gulpTask -> server 支持代理功能，但是需要自己配置 targetRoot 


* 第四点

      html目录下的每个 page 都要建立对应的 css, 和 js 否则报错

## 运行环境

node >= 10.0

