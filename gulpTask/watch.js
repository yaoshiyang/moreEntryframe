
/**
 * @returns 返回流 
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src 资源参数对象
 * @params task需要监听的任务
 */
const path = require('path');
module.exports = function (gulp, $, src, task) {
    $.util.log(`正在执行监测任务`);
    gulp.watch(src.html, [task.html])
    // gulp.watch("src/**/*.js", [task.webpackDevelopment]); // 这种方式是全部更新不可取
    gulp.watch("src/**/*.less", [task.style]);
    gulp.watch("dist/**/*").on('change', function(file) {
        gulp.src('dist/')
        .pipe($.connect.reload());
    });
};