// Measuring the Critical Rendering Path with Navigation Timing
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

function logCRP() {
  var timeOf = window.performance.timing,
    domContentLoaded = timeOf.domContentLoadedEventStart - timeOf.domLoading,
    domComplete = timeOf.domComplete - timeOf.domLoading;
  var stats = document.getElementById('crp-stats');
  stats.textContent = 'DOM Content Loaded: ' + domContentLoaded + 'ms, onload: ' + domComplete + 'ms';
}

window.addEventListener('load', function() {
  logCRP();
});
