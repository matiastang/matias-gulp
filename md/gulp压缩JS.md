<!--
 * @Author: tangdaoyong
 * @Date: 2020-12-30 18:52:59
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-31 11:08:01
 * @Description: gulp 压缩 JS
-->

# gulp 压缩 JS

[gulp 压缩 JS](https://github.com/og/gulp-book/blob/master/chapter2.md)

## 基本使用

* 安装`gulp-uglify`
```
yarn add --dev gulp-uglify
```
* 创建`gulpfile.js`文件
```js
// 获取 gulp
const gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
const uglify = require('gulp-uglify');

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 找到文件
    gulp.src('src/js/*.js')
    // 压缩文件
        .pipe(uglify())
    // 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
})
```
* 运行
```
gulp script
```
## 使用`exports`导出

```js
exports.default = function() {
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(uglify())// 压缩文件
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};
```
* 运行(使用`exports.default`默认导出，所有可以直接`gulp`运行)
```
gulp
```

## 添加清除输出文件夹功能


### 使用`del`模块实现删除

* 安装`del`
```
yarn add --dev del
```
* 添加`task`
注意使用[`del`](https://github.com/sindresorhus/del)需要异步。
```
const del = require('del');

/**
 * @description: 清除输入文件夹
 * @param {*}
 * @return {*}
 */
exports.clear_js = async function(cb) {
    await del(['dist/js/*.js'], cb);
};
```
* 运行
```
gulp clear_js 
```
## JS语法兼容兼容

* 安装依赖
```
# Babel 7
$ yarn add --dev gulp-babel @babel/core @babel/preset-env

# Babel 6
$ yarn add --dev gulp-babel@7 babel-core babel-preset-env
```
* 使用
```js
const babel = require('gulp-babel');// babel

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

/**
 * @description: 压缩js文件
 * @param {*}
 * @return {*}
 */
exports.default = function() {
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(uglify())// 压缩文件
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};
```
* 运行
```
# 仅转换
gulp jsbabel
# 转换压缩
gulp
```

## 输出文件重命名

* 安装
```
yarn add --dev gulp-rename
```
* 使用
```js
const rename = require('gulp-rename');// 重命名

/**
 * @description: 压缩js文件
 * @param {*}
 * @return {*}
 */
exports.default = function() {
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(uglify())// 压缩文件
        .pipe(rename({ extname: '.min.js' }))// 重命名
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};
```
## 阶段输出
```js
/**
 * @description: 压缩js文件
 * @param {*}
 * @return {*}
 */
exports.default = function() {
    return gulp.src('src/js/*.js')// 找到文件
        .pipe(babel({
            presets: ['@babel/env']
        }))// 处理JS兼容处理
        .pipe(gulp.dest('dist/js'))// 阶段输出babel处理后的文件
        .pipe(uglify())// 压缩文件
        .pipe(rename({ extname: '.min.js' }))// 重命名
        .pipe(gulp.dest('dist/js'));// 另存压缩后的文件
};
```
## 监听文件更改自动自动

由于 `gulp.run`和`gulp.start` 已经不能能用了，所以我们无法直接代码中执行 `task` 的
代码中触发 `task` 的唯二的方法就是:

1. `gulp.watch` 触发某个/组 task
2. `gulp.task` 前置依赖某个/组 task ，然后在命令行中执行 `gulp sometask` 来执行那些 `task`

* 使用 `gulp.watch(src, fn)` 检测指定目录下文件的修改后执行任务。
```js
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
```
* 运行
```
gulp js_runloop
```
**注意**运行后进入监听状态，需要当文件改变的时候才会触发，可以`control + c`退出。

## 先执行一次后监听
```js
/**
 * @description: 默认命令，先执行，然后监听
 */
exports.default = async function() {
    console.log('default->');
    // await gulp.series('clear_tmp', 'script')();
    return await gulp.series(script, js_runloop)();
}
```
**注意**`"gulp": "^4.0.2"`中`series`的定义：
```ts
(method) Undertaker.series(...tasks: Undertaker.Task[]): Undertaker.TaskFunction (+1 overload)
```
返回的是一个`TaskFunction`所以需要执行才行，所以需要类似`gulp.series(script1, script2)()`这样写。