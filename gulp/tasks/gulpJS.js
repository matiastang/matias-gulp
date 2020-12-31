/*
 * @Author: tangdaoyong
 * @Date: 2020-12-31 11:42:55
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-31 15:39:04
 * @Description: gulp处理js
 */
const gulp = require('gulp');// 获取 gulp
const uglify = require('gulp-uglify');// 获取 uglify 模块（用于压缩 JS）
const babel = require('gulp-babel');// babel
const rename = require('gulp-rename');// 重命名
const stripDebug = require('gulp-strip-debug');
const vinylPaths = require('vinyl-paths');

const del = require('del');
// const delete = require('delete');

/**
 * @description: 清除输入文件夹
 * @param {*}
 * @return {*}
 */
exports.clear_js = async function(cb) {
    await del(['dist/js/*.js'], cb);
};

/**
 * @description: 清空缓存文件夹
 * @param {*}
 * @return {*}
 */
const clear_tmp = async function(cb) {
    console.log('clear_tmp->');
    return gulp.src('dist/js/*')
		.pipe(stripDebug())
		.pipe(vinylPaths(async paths => {
            console.log('Paths:', paths);
            await del(paths, cb);
        }));
        // .pipe(vinylPaths(del));
};

exports.clear_tmp =  clear_tmp
// gulp.task('clear_tmp', clear_tmp);

/**
 * @description: js,babel语法兼容
 * @param {*}
 * @return {*}
 */
exports.jsbabel = function() {
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
// gulp.task('script', function() {
//     gulp.src('src/js/*.js')// 找到文件
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))// 处理JS兼容处理
//         .pipe(gulp.dest('dist/js'))// 阶段输出babel处理后的文件
//         .pipe(uglify())// 压缩文件
//         .pipe(rename({ extname: '.min.js' }))// 重命名
//         .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
// })

/**
 * @description: 压缩js文件
 * @param {*}
 * @return {*}
 */
const script = function () {
    console.log('script->');
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(gulp.dest('dist/js'))// 阶段输出babel处理后的文件
        .pipe(uglify())// 压缩文件
        .pipe(rename({ extname: '.min.js' }))// 重命名
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};
exports.script = script;
// gulp.task('script', script);

/**
 * @description: 监听任务
 */
const js_runloop = function() {
    // return gulp.watch('src/js/*.js', () => {
    //     // gulp.run('script');// TypeError: gulp.start is not a function
    //     // gulp.start('script');// TypeError: gulp.start is not a function
    // });
    return gulp.watch('src/js/*.js', script);
};

exports.js_runloop = js_runloop

/**
 * @description: 默认命令，先执行，然后监听
 */
exports.default = async function() {
    console.log('default->');
    // await gulp.series('clear_tmp', 'script')();
    return await gulp.series(script, js_runloop)();
}