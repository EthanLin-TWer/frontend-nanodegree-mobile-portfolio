# Website Performance Optimization portfolio project

Udacity's [Front-End Web Developer Nanodegree][]. The task was to optimize a provided website with a number of optimization and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second. 

## Getting Started

Visit [the homepage][index page] and the [pizza page][] here!

This project is built with NPM and Grunt. Follow the steps below to start the project locally and play around:  

1. download the project to your machine by `git clone`
2. open your terminal and run `npm install` on project root, by doing this make sure you have a global npm installed
3. run `npm run build:watch` to build latest assets and watch for upcoming changes
4. open another terminal and run `npm run serve` to start a local dev server on port 8080
5. open your favorite browser and visit `localhost:8080/dist/index.html`

## Critical Rendering Path Optimization

There're a lot of optimizations performed to achieve a better PageSpeed score. I've summarized the best practice [here][CRP best practice] and listed all the performed optimizations below. And all of them are being automated using Grunt. 

| Categories | Optimizations | HTML | CSS | JS | image |
| :---: | :---: | :---: | :---: | :---: | :---: | 
| eliminate requests | cache | | | | | 
|                | inline critical resource | | ✅ | ✅ | | 
| minimize critical resource path | concat critical resources | | ✅ | ✅ | |
|                   | load non-critical resources asychronously | | ✅ | ✅ | |
| minimize critical resource size | minify | ✅ | ✅ | ✅ | ✅ |
|                               | uglify | | | ✅ | |
|                               | compress | ✅ | ✅ | ✅ | ✅ |

Cache optimization seems pretty much out of my scope as the content is hosted in Github Pages and there's nothing I can do about it. But the score still hits 90+ with all those optimization that have been done and listed above.  

![page-speed-result-desktop](./screenshots/pagespeed/desktop.png)

![page-speed-result-mobile](./screenshots/pagespeed/mobile.png)

## Tasking

* PageSpeed score - Critical Rendering Path
  * [x] `index.html` 应该在 PageSpeed 的 desktop 评测上获得90以上的得分
  * [x] `index.html` 应该在 PageSpeed 的 mobile 评测上获得90以上的得分
* Hitting 60 fps
  * [x] 优化 `views/js/main.js`，使 `views/pizza.html` 在 **滚动时** 能 **稳定** 达到 **`60fps`** 的渲染率
  * [x] 优化 `views/pizza.html` 使其 resize 时间小于 `5ms`
  * [x] 把首页的 pizza 大图弄回来
  * [ ] optimize css import 
  * [ ] fill me in
* Styleguide
  * [x] 阅读 [作业要求][] 
  * [x] 必须包含 `src` 及 `dist` 文件夹
  * [x] 如果使用了构建工具，必须包含 `package.json` 和 `Gruntfile.js` 配置文件
  * [x] 不应该提交 `node_modules` 文件夹
  * [x] Github 仓库的主分支应该是 master 分支（不知道这个什么意思）
  * [x] 如果使用了构建工具，review 的是 `dist` 文件夹里的内容
  * [ ] 必须有 `README.md`，里面必须包含：
    * [x] 安装、运行测试或构建的命令
	* [ ] 所做的优化、分析、截图
	  * [x] crp 
	  * [ ] 60fps
    * [x] Code review 的时候告诉 reviewer，托管在 Github Page 上的服务器响应不快我也没办法啊
  * [x] `views/js/main.js` 中关于 `pizza.html` 的注释必须保存 - 我不删
  * [x] 使用构建工具，如 `Grunt` 或 `Gulp` 等


### Optimization Tips and Tricks

* [Measuring with Navigation Timing][] 
* [Optimize images][]
* [HTTP caching][]

---

[Front-End Web Developer Nanodegree]: https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001
[作业要求]: https://review.udacity.com/#!/projects/2735848561/rubric
[Measuring with Navigation Timing]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html
[Optimize images]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html
[HTTP caching]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html

[index page]: http://linesh.tw/frontend-nanodegree-mobile-portfolio/dist/index.html
[pizza page]: http://linesh.tw/frontend-nanodegree-mobile-portfolio/dist/pizza/pizza.html

[CRP best practice]: https://github.com/linesh-simplicity/linesh-simplicity.github.io/issues/159
