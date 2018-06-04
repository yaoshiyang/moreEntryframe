const webpack = require("webpack");
const glob = require("glob");
const path = require('path');
const config = {
    entry: {
        common: ['Tpl/test.art', 'common']   // 注册第三方需要打包的库 注意这个包最大不建议244
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
        alias:{
            "Tpl": path.resolve(__dirname , 'src/html/components/'),  // 配置art路径
            "common": path.resolve(__dirname , 'src/js/common/test.js')  // 配置common.js
        }
    },
    plugins: [

    ],
    externals:{
        window$ : 'window.$'  // 把jquery注册到全局 ， 这样涉及到第三方jquery也可以用了。html直接引入JS 即可
    },
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

