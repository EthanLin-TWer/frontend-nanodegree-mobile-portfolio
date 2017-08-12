# Website Performance Optimization portfolio project

## Tasking

* PageSpeed score - Critical Rendering Path
	* [x] `index.html` 应该在 PageSpeed 的 desktop 评测上获得90以上的得分
	* [x] `index.html` 应该在 PageSpeed 的 mobile 评测上获得90以上的得分
* Fps Optimization
	* [ ] 优化 `views/js/main.js`，使 `views/pizza.html` 在 **滚动时** 能 **稳定** 达到 **`60fps`** 的渲染率
	* [x] 优化 `views/pizza.html` 使其 resize 时间小于 `5ms`
* Styleguide
	* [ ] 必须有 `README.md`，里面必须包含：
		* [ ] 安装、运行测试或构建的命令
		* [ ] 所做的优化和分析
    	* [ ] Code review 的时候告诉 reviewer，托管在 Github Page 上的服务器响应不快我也没办法啊
    	* [x] 更新更高分的屏幕截图
	* [ ] `views/js/main.js` 中关于 `pizza.html` 的注释必须保存
	* [x] 使用构建工具，如 `Grunt` 或 `Gulp` 等
	* [ ] 必须包含 `package.json`、`src`及`dist`文件夹

## PageSpeed Insights

![page-speed-result-desktop](./screenshots/pagespeed/desktop.png)

![page-speed-result-mobile](./screenshots/pagespeed/mobile.png)

## Critical Rendering Path Optimization Tasking 

* [x] 环境配置
	* [x] 配置 `grunt`
	* [x] 配置 `grunt-pagespeed`
	* [x] 配置 `ngrok`
    * [x] 添加 npm scripts - psi, psi:watch, build, build:watch  
* [x] Minification
  * [x] HTML
    * [x] basic minification - htmlmin html-minifier
    * [x] JS 代码中的注释没移除 - minifyJS: true
    * [x] JS 代码还有换行和空格 - minifyJS: true
  * [x] CSS
    * [x] basic minification - cssmin
    * [x] `dist/pizza/css/main.min.css` 还有注释 - 420 / (420 + 9857) = 4%，不是很多，不搞了
  * [x] JavaScript
* [x] Uglification
  * [x] JavaScript - 只有一些函数名没有 uglify，不过比率非常小，估计不到0.01%。故忽略不计。
* [x] Compress
  * [x] GZip HTML
  * [x] GZip CSS
  * [x] GZip JavaScript
  * [x] Images 
    * [x] 自动化 - 在 img 标签中指定了 100px 的图片，能够自动压缩成这个比例？
    * https://developers.google.com/speed/docs/insights/OptimizeImages
    * https://github.com/excellenteasy/grunt-image-resize
* [x] Combine critical resource
  * [x] CSS - `bootstrap.css` + `style.css` -> `main.min.css`
  * [x] JavaScript
* [x] Defer and asynchronously load non-critical resource
  * [x] CSS
    * [x] 将 render blocking CSS 放在页面底端
  * [x] JavaScript
* [x] Cache - hard or impossible to modify Github Pages server  
  * [x] HTML
  * [x] CSS
  * [x] JavaScript 
  * [x] Images
* [x] Inline critical and small resources 
  * [x] JavaScript
  * [x] CSS
    * [x] organize entries
* [ ] Others
  * [ ] Optimize online fonts 
  * [ ] Optimize online images 
  * [ ] Refactor all duplicate configuration? 

## Hitting 60fps 

* 优化 `views/js/main.js`，使 `views/pizza.html` 在 **滚动时** 能 **稳定** 达到 **`60fps`** 的渲染率
* 优化 `views/pizza.html` 使其 resize 时间小于 `5ms`

### Optimization Tips and Tricks

* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
