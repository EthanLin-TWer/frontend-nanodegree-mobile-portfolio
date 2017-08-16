# Critical Rendering Path Optimization Tasking 

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
    * [x] 自动化 - 在 img 标签中指定了 100px 的图片，自动压缩成这个比例
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
  * [x] Optimize online images 
  * [ ] Optimize online fonts 
  * [x] Refactor all duplicate configuration? 
    * [x] Can they auto scan new components with a new folder and similar structure?  - yes most of them, while some cannot: 
      * `concat` task: not able to auto-scan components as now components are hard-coded
      * `imagemagick-resize` task: images path can only be hardcoded as they need unique size while resizing
      * `critical` task: hardcoded due to lack of support of the plugin
    * [x] Can they auto scan files?  - yes, as long as they're following project naming/structure conventions like: 
      * js files: make sure they are categorized and placed under `vendor/` or `bundle/` directory
      * css files: make sure they are categorized and placed under different directories like `main/` or `print/`
      * html files: make sure they are placed under the component directory root
      * images: make sure they are placed under `images/` folder under the component directory root
      * components: make sure they have their own directory under `src`, like `index/` and `pizza/`
    * [x] Support component based build & watch? - not necessary at the moment 
  * [ ] optimize css import 
