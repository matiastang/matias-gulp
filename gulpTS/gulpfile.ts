/*
 * @Author: tangdaoyong
 * @Date: 2021-01-04 09:57:27
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-01-04 10:03:06
 * @Description: gulpfile
 */
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
plugins.del = require('del');

const gulpJS = require('./tasks/gulpJS');
console.log(gulpJS);

/**
 * @description: 同步任务
 * @param {*} obj
 * @param {*} func
 * @param {array} arguments
 * @return {*}
 */
const gulpTask = (obj, func, ...arguments) => {
    return (cb) => {
        obj[func](...arguments, cb);
    };
};

/**
 * @description: 异步任务
 * @param {*} async
 * @param {*} func
 * @param {array} arguments
 * @return {*}
 */
const gulpAsyncTask = (obj, func, ...arguments) => {
    return async (cb) => {
        await (obj[func])(...arguments, cb);
    };
};

const gulpFileTasks = function() {
    return {
        script: gulpTask(gulpJS, 'script', gulp, plugins),
        clear: gulpAsyncTask(gulpJS, 'clear', gulp, plugins)
    }
};
console.log(gulpFileTasks());

console.log(gulpTaskList);

module.exports = gulpFileTasks();