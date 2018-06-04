
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
        let devConfig, devCompiler, watching;
        devConfig = Object.assign({}, webpackConfig);
        devConfig.mode = 'development'
        devConfig.devtool = "soucemap";
        devConfig.watch = true;  // 这边通过watch增量构建法来优化webpack，同时注意不能在gulp同步任务使用，会阻塞流的！
        devCompiler = webpack(devConfig);
        devCompiler.run((err, stats) => {  //这个 API 一次只支持一个并发编译。当使用 run 时，会等待它完成后，然后才能再次调用 run 或 watch。当使用 watch 时，调用 close，等待它完成后，然后才能再次调用 run 或 watch。多个并发编译会损坏输出文件。
            if (err) {
                throw new $.util.PluginError("webpack:build-dev");
                return;
            }
            $.util.log("[webpack:build-dev]", stats.toString({ colors: true }));

            watching = devCompiler.watch( {    // 这边暴露一个close方法
                aggregateTimeout:500,
                ignored: /node_modules/,
                poll:true
             }, (err , stats) => {
                if (err) {
                    throw new $.util.PluginError("webpack:build-dev");
                    return;
                }
                $.util.log("[webpack:build-dev-watch]",stats.toString({
                    Times:true,
                    chunks:false,
                    colors:true
                }));
                $.util.log("[webpack:build-dev-watch]",'========watch文件更新完成=======');
            });
        }); 
    }
}