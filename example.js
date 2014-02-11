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
    // Create event stream on mouse move over svg element
    mouseMove = bacon.fromEventTarget($svg, 'mousemove'),
    // Create event stream on mouse click and release
    mouseDown = bacon.fromEventTarget($svg, 'mousedown').map(true),
    mouseUp = bacon.fromEventTarget($svg, 'mouseup').map(false),

    // Construct a property that is true/false based on
    // whether the mouse button is clicked or not.
    isClickDown = mouseDown.merge(mouseUp).toProperty(false);

var mouseNewXY =
  mouseMove
    // Filter if the mouse is pressed or not
    .filter(isClickDown)
    // Throttle over 50 ms (creates event stream from property)
    .throttle(50)
    // Transform to more readable object
    .map(function (e) {
      return {
        x: e.clientX,
        y: e.clientY,
        // to add some flare
        // (and in case we want to add socket support)
        color: randomColor
      };
    });
    // here one could emit socket data

mouseNewXY
  // Transform to Circle element
  .map(toCircle)
  // Append circle-element to svg-element
  .assign($svg[0], 'appendChild');

isClickDown
  // Transform to Yes if true, No if not
  .map(function (down) {
    return down ? 'Yes' : 'No';
  })
  // Assign string to html element
  .assign($('.mouse-down'), 'text');