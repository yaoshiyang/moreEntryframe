const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    rename:{
        'gulp-strip-css-comments':'stripCssComments',
        'gulp-minify-css':'minifyCss',
        'gulp-html-tpl':'htmltpl',
        'gulp-html-replace':'htmlreplace'
    }
});



// 入参
const src = {
    html:'src/html/*.html',
    vendor:'vendor/*',
    style:'src/style/*/index.less',
    js:'src/js/*/index.js',
    assets:'assets/**/*'
};

// 生产环境的打包
const dist = {
    root:'dist/',
    html:'dist/',
    style:'dist/style',
    js:'dist/js',
    vendor:'dist/vendor',
    assets:'dist/assets',
}

// 发布产线的打包
var bin = {
    root:'bin/',
    html:'bin/',
    style:'bin/style',
    vendor:'bin/vendor',
    js:'dist/js',
    assets:'bin/assets',
}

// gulp task 1.return 是用来表示流程是异步还是同步的 
// 注册任务；
const cleanTask = require(__dirname + '/gulpTask/clean');
gulp.task('cleanDist', ()=>{
    cleanTask.cleanDist(gulp, $, dist)
});
gulp.task('cleanBin', () =>{
    cleanTask.cleanBin(gulp, $, bin)
});

const copyTask = require(__dirname + '/gulpTask/copy');
gulp.task('copyVendor', ()=>{
    return copyTask.copyVendor(gulp, $, src, dist)
});
gulp.task('copyAssets', () =>{
    return copyTask.copyAssets(gulp, $, src, dist)
});
gulp.task('copyDist', () =>{
    return copyTask.copyDist(gulp, $, dist, bin)
});

const css = require(__dirname + '/gulpTask/css');
gulp.task('lessToCss', ()=>{
    return css(gulp, $, src, dist)
});

const html = require(__dirname + '/gulpTask/html');
gulp.task('html', ()=>{
    return html(gulp, $, src, dist)
});

const jsTask = require(__dirname + '/gulpTask/javascript');
gulp.task('production', () => {
    jsTask.production(gulp, $)
});
gulp.task('developMent', ()=>{
    jsTask.developMent(gulp, $)
});

const serverTask = require(__dirname + '/gulpTask/server');
gulp.task('server', () =>{
    serverTask(gulp, $, dist)
});

const watchTask = require(__dirname + '/gulpTask/watch');
gulp.task('watch', () =>{
    watchTask( gulp, $, src, {
        html: 'html',
        webpackDevelopment: 'developMent',
        style: 'lessToCss'
    })
});


// 开发环境task
gulp.task('default',() =>{
    $.sequence(['cleanDist'],['copyVendor','copyAssets','html','lessToCss'],['developMent'] ,'server','watch')(function(){
        console.log('===========开发环境生成成功===========');
    })
});

// 生产环境task
gulp.task('build', ()=>{
    $.sequence(['cleanDist'],['copyVendor','copyAssets','html','lessToCss'],['production'],['cleanBin'],['copyDist'])(function(){
        console.log('===========生产环境发布成功===========');
    })
});




