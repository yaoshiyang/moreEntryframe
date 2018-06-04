
/**
 * webpack 模块化JS
 * @returns 返回流 
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    production(gulp, $, done) {
        $.util.log(`进入webpack发布环境Start`);
        const config = Object.assign({}, webpackConfig);
        config.mode = 'production';  // https://webpack.docschina.org/concepts/mode
        webpack(config, (err, stats) => {
            if (err) throw new $.util.PluginError("webpack:build", err);
            $.util.log("[webpack:production]", stats.toString({ colors: true }));
            done();
        });
    },
    developMent(gulp, $) {
        $.util.log(`进入webpack开发环境Start`);
        let devConfig, devCompiler;
        devConfig = Object.assign({}, webpackConfig);
        devConfig.mode = 'development'
        devConfig.devtool = "soucemap";
        devConfig.watch = true;  // 这边通过watch增量构建法来优化webpack，同时注意不能在gulp同步任务使用，会阻塞流的！
        devConfig.watchOptions = { 
            aggregateTimeout: 300,
            ignored: /node_modules/
        };
        devCompiler = webpack(devConfig);
        devCompiler.run((err, stats) => {
            if (err) {
                throw new $.util.PluginError("webpack:build-dev");
                return;
            }
            $.util.log("[webpack:build-dev]", stats.toString({ colors: true }));
        });
    }
}