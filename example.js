var $ = require('jquery'),
    bacon = require('baconjs');

var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16),
  toCircle = function (pos) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  el.setAttribute('cx', pos.x);
  el.setAttribute('cy', pos.y);
  el.setAttribute('fill', pos.color);
  el.setAttribute('r', 5);
  return el;
};

var $svg = $('svg'),
    mouseMove = bacon.fromEventTarget($svg, 'mousemove'),
    mouseDown = bacon.fromEventTarget($svg, 'mousedown').map(true),
    mouseUp = bacon.fromEventTarget($svg, 'mouseup').map(false),
    isClickDown = mouseDown.merge(mouseUp).toProperty(false);

var mouseNewXY =
  mouseMove
    .filter(isClickDown)
    .throttle(50)
    .map(function (e) {
      return {
        x: e.clientX,
        y: e.clientY,
        color: randomColor
      };
    });

mouseNewXY
  .map(toCircle)
  .assign($svg[0], 'appendChild');

isClickDown
  .map(function (down) {
    return down ? 'Yes' : 'No';
  })
  .assign($('.mouse-down'), 'text')