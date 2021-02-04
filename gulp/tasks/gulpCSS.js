/*
 * @Author: tangdaoyong
 * @Date: 2020-12-31 15:39:51
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-02 18:33:50
 * @Description: file content
 */
const script = function (gulp, plugins) {
    console.log('script->');
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(plugins.babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(gulp.dest('dist/js'))// 阶段输出babel处理后的文件
        .pipe(plugins.uglify())// 压缩文件
        .pipe(plugins.rename({ extname: '.min.js' }))// 重命名
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};

const clear_js = async function (gulp, plugins, cb) {
    await plugins.del(['dist/js/*.js'], cb);
}

module.exports = {
    script,
    clear_js
}