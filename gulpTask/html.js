
/**
 * @returns 返回流 
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src 资源参数对象
 * @param dist 资源打包目录
 */
const artTemplate = require('art-template');
const path = require('path');

// 还可以扩展动态获取common.js 等；

module.exports = function(gulp, $, src, dist){
    $.util.log(`生成html`);
    return gulp.src(src.html)
    .pipe($.htmltpl({
        tag: 'template',
        paths: [path.resolve('src/html/components')],
        engine: function(template, data) {
            artTemplate.defaults.imports.hash = () => Math.random().toString(16).substr(2);
            return artTemplate.compile(template)(data)
        },
        data: {
            useHeader: false
        },
        beautify: {
            indent_char: ' ',
            indent_with_tabs: false
        }
    }))
    .pipe($.htmlreplace({
        css:{
            src: null,
            tpl:'<link rel="stylesheet" href="./style/%f/index.css">'
        },
        js:{
            src: null,
            tpl:'<script src="./js/%f.js"></script>'  
        }
        // inlineCss:{}, //防止首屏加载需要  https://github.com/VFK/gulp-html-replace
    }))
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist.html))
}