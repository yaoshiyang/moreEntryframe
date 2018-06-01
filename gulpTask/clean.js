
/**
 * clean对应的目录
 * @param gulp gulp 对象
 * @param $ 插件对象
 * @param dist/bin  删除目录对象
 * ps: clean 是异步的，所以增加gulp-sequence来控制流程
 */
const del = require('del');
module.exports = {
    cleanDist(gulp, $, dist){
        $.util.log(`删除生产环境压缩`);
        del.sync(dist.root);
    },
    cleanBin(gulp, $, bin){
        $.util.log(`删除发布环境压缩`);
        del.sync(bin.root)
    }
}