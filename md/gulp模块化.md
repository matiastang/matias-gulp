<!--
 * @Author: tangdaoyong
 * @Date: 2020-12-31 11:33:45
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-31 16:12:01
 * @Description: gulp模块化
-->
# gulp模块化

[前端 | 重构 gulpfile.js](https://segmentfault.com/a/1190000002880177)

## 使用`require-dir`

* 安装[require-dir](https://www.npmjs.com/package/require-dir)
```
yarn add --dev require-dir
```

* 使用，配置`gulpfile.js`
```js
// 使用require-dir
const requireDir = require('require-dir'), tasks = requireDir('./gulp/tasks', { recurse: true });
console.log(tasks);
/*
{ gulpJS:
   { clear_js: [AsyncFunction],
     clear_tmp: [AsyncFunction: clear_tmp],
     jsbabel: [Function],
     script: [Function: script],
     js_runloop: [Function: js_runloop],
     default: [AsyncFunction] } }
*/

exports.script = () => {
    return tasks.gulpJS.script();
};

exports.default = async () => {
    return await tasks.gulpJS.clear_js();
};
```
`gulp` 会根据 `requireDir` 提供的路径自动加载该目录下所有的任务，并找到任务 `default` 开始执行。
* 运行
```
# 运行script
gulp script
# 运行default
gulp
```

## 使用`gulp-load-plugins`

* 安装[gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
```
yarn add --dev gulp-load-plugins
```

* 使用
`gulpCSS.js`文件，文件中不需要导入插件，使用参数从外部传入，可以避免在每个文件导入插件。
```js
module.exports = function (gulp, plugins) {
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
```
`gulpfile.js`文件。
```js
// 使用gulp-load-plugins
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')();
const gulpTaskList = require('fs').readdirSync('./gulp/tasks/');

// 用到的插件全部挂载到plugins上
plugins.uglify = require('gulp-uglify');// 获取 uglify 模块（用于压缩 JS）
plugins.babel = require('gulp-babel');// babel
plugins.rename = require('gulp-rename');// 重命名
plugins.stripDebug = require('gulp-strip-debug');
plugins.vvinylPaths = require('vinyl-paths');

require('./gulp/tasks/gulpCSS')(gulp, plugins);
// gulpTaskList.forEach(function(taskfile) {
//     require(`./gulp/tasks/${taskfile}`)(gulp, plugins);
// });
```
* 运行
因为`require('./gulp/tasks/gulpCSS')`导入的是一个方法，所有直接`require('./gulp/tasks/gulpCSS')(gulp, plugins);`就调用了方法，即运行`gulpfile.js`文件就执行了对应的`task`.
```js
node gulpfile.js
```