/*
 * @Author: tangdaoyong
 * @Date: 2021-01-04 09:55:44
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-01-04 09:57:08
 * @Description: js 处理
 */
const script = function (gulp, plugins, cb) {
    console.log('script->');
    gulp.src('src/js/*.js')// 找到文件
        .pipe(plugins.babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(gulp.dest('dist/js'))// 阶段输出babel处理后的文件
        .pipe(plugins.uglify())// 压缩文件
        .pipe(plugins.rename({ extname: '.min.js' }))// 重命名
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
        cb();
};

const clear = async function (gulp, plugins, cb) {
    await plugins.del(['dist/js/*.js'], cb);
}

module.exports = {
    script,
    clear
}