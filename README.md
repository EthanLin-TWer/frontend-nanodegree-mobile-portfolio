# Website Performance Optimization portfolio project

## Tasking

* PageSpeed score - Critical Rendering Path
  * [x] `index.html` 应该在 PageSpeed 的 desktop 评测上获得90以上的得分
  * [x] `index.html` 应该在 PageSpeed 的 mobile 评测上获得90以上的得分
* Hitting 60 fps
  * [ ] 优化 `views/js/main.js`，使 `views/pizza.html` 在 **滚动时** 能 **稳定** 达到 **`60fps`** 的渲染率
  * [x] 优化 `views/pizza.html` 使其 resize 时间小于 `5ms`
* Styleguide
  * [x] 阅读 [作业要求][] 
  * [x] 必须包含 `src` 及 `dist` 文件夹
  * [x] 如果使用了构建工具，必须包含 `package.json` 和 `Gruntfile.js` 配置文件
  * [x] 不应该提交 `node_modules` 文件夹
  * [x] Github 仓库的主分支应该是 master 分支（不知道这个什么意思）
  * [x] 如果使用了构建工具，review 的是 `dist` 文件夹里的内容
  * [ ] 必须有 `README.md`，里面必须包含：
    * [ ] 安装、运行测试或构建的命令
	* [ ] 所做的优化和分析
    * [ ] Code review 的时候告诉 reviewer，托管在 Github Page 上的服务器响应不快我也没办法啊
    * [x] 更新更高分的屏幕截图
  * [x] `views/js/main.js` 中关于 `pizza.html` 的注释必须保存 - 我不删
  * [x] 使用构建工具，如 `Grunt` 或 `Gulp` 等

## PageSpeed Insights - Critical Rendering Path Optimization

![page-speed-result-desktop](./screenshots/pagespeed/desktop.png)

![page-speed-result-mobile](./screenshots/pagespeed/mobile.png)

### Optimization Tips and Tricks

* [Measuring with Navigation Timing][] 
* [Optimize images][]
* [HTTP caching][]

---

[作业要求]: https://review.udacity.com/#!/projects/2735848561/rubric
[Measuring with Navigation Timing]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html
[Optimize images]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html
[HTTP caching]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html