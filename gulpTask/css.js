
/**
 * 处理CSS
 * @returns 返回流 
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src src 对象
 * @param output output 对象
 */
// 如果移动端可以增加postCss 处理
const { isArray } = require('lodash');
const configFrame = require('../configFrame');

module.exports = function (gulp, $, src, dist) {
    $.util.log(`解析CSS资源`);
    let initBrowerslist = [
        "> 1%",
        "IE 10"
    ];
    let browerslist = configFrame.gulp_css_browserslist;
    (!isArray(browerslist) || !browerslist.length) ? $.util.log('[gulp-task-css]',`检查gulp_css_browserslist值是否符合要求`) :  (initBrowerslist = browerslist);
    return gulp.src(src.style)
        .pipe($.less())
        // 报错处理
        .pipe($.plumber({
            errorHandler: $.notify.onError('Error:<%= error.message %>')
        }))
        // 去除注释
        .pipe($.stripCssComments())
        // 自动补全前缀
        .pipe($.autoprefixer({"browsers": initBrowerslist}))
        // 注意base64
        .pipe($.base64({
            maxImageSize: 10 * 1024
        }))
        // 压缩CSS
        .pipe($.minifyCss())
        .pipe(gulp.dest(dist.style))
};