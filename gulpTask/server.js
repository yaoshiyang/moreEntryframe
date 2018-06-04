
/** 
 * 简历
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src 资源参数对象
 */
const proxyMiddleware = require('http-proxy-middleware'); //代理
const configFrame = require('../configFrame');
const targetRoot = configFrame.gulp_server_targetRoot||'http://192.168.82.11:7085';

module.exports = function (gulp, $, dist) {
    $.util.log(`================================`);
    $.util.log(`启动本地服务http://localhost:8080`);
    $.util.log(`================================`);
    $.connect.server({
        root:dist.root,
        port:8080,
        livereload:true,
        middleware:(connect, opt) => [proxyMiddleware('/api',{target: targetRoot,changeOrigin: true})]
    });
};