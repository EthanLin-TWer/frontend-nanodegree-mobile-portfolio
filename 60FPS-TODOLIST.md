# Hitting 60 fps

* [x] find all functionalities
  * scrolling
  * resize pizza
  * anchor jumping(e.g. to `#location`, `#ingredients`, `#randomPizzas`)
* [ ] scrolling
  * 首先的问题是，滚动的时候页面没有办法稳定达到60fps
  * [ ] find JavaScript issues 
  * [ ] find layout issues  
  * [ ] find painting issues
    * 这是第一个问题。profile 了一下，paint 的时间占到了 2ms 多，超过了期望的2ms，是 `updatePositions()` 和 composite layers 时间的三倍
  * [ ] find layer composite issues
* [ ] pizza resize 
  * [ ] find JavaScript issues 
  * [ ] find layout issues  
  * [ ] find painting issues
  * [ ] find layer composite issues
  