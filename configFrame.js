/**
 *  这边只是简单的配置，更多复杂应用请直接修改代码
 */
const path = require('path');

module.exports = {
    // 此处是配置webpack生成的common.js ，支持String & Arrary
    // 建议存放 公共的art文件 和 common.js 文件
    webpack_entryCommon:['Tpl/test.art', 'common'], 

    // 默认配置好了  1.Tpl 指向的是 art 模板  2.common的路径
    webpack_resolve_alias: {
        "Tpl": path.resolve(__dirname , 'src/html/components/'),  // 配置art路径
        "common": path.resolve(__dirname , 'src/js/common/index.js')  // 配置common.js
    },
  
    // 配置全局模块
    webpack_externals:{
        window$ : 'window.$'  // 把jquery注册到全局 ， 这样涉及到第三方jquery也可以用了。html直接引入JS 即可
    },

    // 是否开启js代码检查
    webpack_esline_isOpen:false,

    // 发版是否需要压缩成zip
    // 默认是false
    gulp_copy_copyDist_isZip: false,  

    // 发版本路径
    // 默认是 bin/ 目录下
    // 相对于gulp文件目录
    gulp_copy_copyDist_root:'',
    
    // 配置browserslist   https://github.com/browserslist/browserslist#queries
    // 这边必须配置Arrary类型，并且必须不为空 => 否则用默认的
    gulp_css_browserslist:[],

    // 配置 gulpTask -> html 任务
    // 配置 art-template的管道符，只针对当前的html模板
    // 这边只支持数据类型是Object
    gulp_html_template_imports:{
        // hash : () => Math.random().toString(16).substr(2)
    },

    // 配置 gulpTask -> server
    // 只支持单个不支持多个， 多个可自行改代码
    gulp_server_targetRoot : process.env.NODE_ENV == 'development' ? 'http://192.168.82.11:7085/api/':'http://192.168.82.11:7085'
}

