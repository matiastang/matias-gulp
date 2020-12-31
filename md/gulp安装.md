<!--
 * @Author: tangdaoyong
 * @Date: 2020-12-30 18:49:19
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-12-31 11:44:00
 * @Description: 安装gulp
-->
# 安装gulp

[安装gulp](https://github.com/og/gulp-book/blob/master/chapter1.md)

```
yarn init
yarn add --dev gulp
gulp -v
```

## 常用插件

* [del](https://github.com/sindresorhus/del)多文件删除。
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)压缩图片。
* gulp-less: 把less文件转成css文件
* gulp-clean-css：css文件压缩。
* gulp-uglify：js压缩
* gulp-concat：js合并
* gulp-rename：重命名，给js压缩文件添加.min后缀
* gulp-jshint：js语法检查