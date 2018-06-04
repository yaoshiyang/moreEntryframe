const webpack = require("webpack");
const glob = require("glob");
const path = require('path');
const configFrame = require('./configFrame');
const { union } = require('lodash');

const config = {
    entry: {
        // 1.注册第三方需要打包的库 注意这个包最大不建议244  2.不建议取消common,正常活动页都会产生2个即以上页面
        common: union(['common'], configFrame.webpack_entryCommon)   
    },
    output: {
        path: path.resolve(__dirname , 'dist/js/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            },
            {
                test: /\.art$/,
                exclude: /node_modules/,
                loader: "art-template-loader" 
            },
            {
                test: '/\.js$',
                exclude: /node_modules/,
                loader: 'bebel-loader',
                options: { 
                    presets: ['es2015', 'stage-0'] // react 快照其实可以不要，本来准备做jsx支持的
                }
            }
        ]
    },
    resolve:{
        alias:Object.assign({},{
            "Tpl": path.resolve(__dirname , 'src/html/components/'),  // 配置art路径
            "common": path.resolve(__dirname , 'src/js/common/index.js')  // 配置common.js
        },configFrame.webpack_resolve_alias)
    },
    plugins: [],
    externals:Object.assign({},configFrame.webpack_externals),
    optimization:{   // 如果使用很多第三方库，请分开打包
        splitChunks:{
            cacheGroups:{
                common:{
                    test: /common/,
                    name: "common",  // chunks with equal name are merged
                    chunks: "initial",
                    enforce: true    // Ignore minimum size, minimum chunks and maximum requests and always create chunks for this cache group
                }
            }
        }
    },
    // cache:false,
    node: {
        fs: "empty"  // can't resolve 'fs' => https://github.com/aui/art-template-loader/issues/5
    }
}

/**
 *  获取多个页面
 */
const entry = name => path.resolve(__dirname , 'src/js/' + name + '/index.js');
const files = glob.sync(path.resolve(__dirname , 'src/js/*/index.js'));
const newEntries = files.reduce((memo, file) => {
    const name = /.*\/(.*?)\/index\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo;
}, {});

config.entry = Object.assign({}, config.entry, newEntries);

module.exports = config;

