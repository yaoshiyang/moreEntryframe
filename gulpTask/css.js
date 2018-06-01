
/**
 * 处理CSS
 * @returns 返回流 
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src src 对象
 * @param output output 对象
 */
// 如果移动端可以增加postCss 处理
module.exports = function (gulp, $, src, dist) {
    $.util.log(`解析CSS资源`);
    return gulp.src(src.style)
        .pipe($.less())
        // 报错处理
        .pipe($.plumber({
            errorHandler: $.notify.onError('Error:<%= error.message %>')
        }))
        // 去除注释
        .pipe($.stripCssComments())
        // 自动补全前缀
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // 注意base64
        .pipe($.base64({
            maxImageSize: 10 * 1024
        }))
        // 压缩CSS
        .pipe($.minifyCss())
        .pipe(gulp.dest(dist.style))
};