# Hitting 60 fps

* [x] find all functionalities
  * scrolling
  * resize pizza
  * anchor jumping(e.g. to `#location`, `#ingredients`, `#randomPizzas`)
* [x] 首先的问题是，滚动的时候页面没有办法稳定达到60fps
  * [x] 探索一下页面结构
    * 页面加载的时候会生成一堆pizza，这堆东西滚动的时候有可能会有性能问题
    * `updatePositions()` 会在滚动的时候被调用，一定是需要优化的一个函数
    * `pizzaElementGenerator` 可能会有性能问题，但这属于页面加载时 generate 那块，这里已经过了 PageSpeed 测速，因此优先级放低
  * [x] Measure first
    * profile 了一下，paint 的时间占到了 2ms 多，超过了期望的2ms，是 `updatePositions()` 和 composite layers 时间的三倍
* [ ] scrolling
  * [ ] find JavaScript issues 
    * `updatePositions()` 可能需要优化，但优先级在 painting 和分层问题之后
    * 是否可以 batch style 的更新
  * [ ] find layout issues  
  * [ ] find painting issues
    * [ ] 确定可用分层
    * [ ] profile 优化
  * [ ] find layer composite issues
* [ ] pizza resize 
  * [ ] find JavaScript issues 
  * [ ] find layout issues  
  * [ ] find painting issues
  * [ ] find layer composite issues
  