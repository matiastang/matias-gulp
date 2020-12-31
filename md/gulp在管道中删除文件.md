<!--
 * @Author: tangdaoyong
 * @Date: 2020-12-30 20:40:17
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-30 20:53:00
 * @Description: 在管道中删除文件
-->
# 在管道中删除文件

使用 [vinyl-paths](https://github.com/sindresorhus/vinyl-paths) 模块来简单地获取 `stream` 中每个文件的路径，然后传给 `del` 方法。

* 安装
```
yarn add --dev vinyl-paths gulp-strip-debug
```
* 使用
```js
const vinylPaths = require('vinyl-paths');
const stripDebug = require('gulp-strip-debug');

/**
 * @description: 清空缓存文件夹
 * @param {*}
 * @return {*}
 */
exports.clear_tmp = async function(cb) {
    return gulp.src('dist/js/*')
		.pipe(stripDebug())
		.pipe(vinylPaths(async paths => {
            console.log('Paths:', paths);
            await del(paths, cb);
        }));
        // .pipe(vinylPaths(del));
};
```