
/**
 * 移动相关目录
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src 资源参数对象
 * @param dist/bin 打包资源
 */
module.exports = {
    copyVendor(gulp, $, src, dist){
        $.util.log(`copy 第三方资源`);
             return gulp.src(src.vendor)
              .pipe(gulp.dest(dist.vendor));
    },
    copyAssets(gulp, $, src, dist){
       $.util.log(`copy 公共资源`);
       return gulp.src(src.assets)
        .pipe(gulp.dest(dist.assets));
    },
    copyDist(gulp, $, dist, bin){
        $.util.log(`copy 生产文件到发布环境`);
        return gulp.src(dist.root+ '**/*')
        //  .pipe($.zip('production.zip'))
         .pipe(gulp.dest(bin.root));
    }
}