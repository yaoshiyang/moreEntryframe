
/**
 * 移动相关目录
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param src 资源参数对象
 * @param dist/bin 打包资源
 */
const configFrame = require('../configFrame');

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
        const src = gulp.src(dist.root+ '**/*');
        if(configFrame.gulp_copy_copyDist_isZip) src.pipe($.zip('production.zip'));
        return src.pipe(gulp.dest( configFrame.gulp_copy_copyDist_root || bin.root));
    }
}