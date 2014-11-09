var test = require('tape');
var getScrollMaxY = require('./dist/get-scrollmax-y-cjs.js');

var body = document.body;
body.style.margin = '0';
body.style.padding = '0 1px 1px 0';
body.style.height = '0';

test('window.scrollMaxY', function(t) {
  'use strict';

  t.plan(3);

  t.equal(
    getScrollMaxY(),
    0,
    'should return 0 when the content is enough small.'
  );

  body.style.height = '9999px';
  var _s = getScrollMaxY();
  
  t.ok(
    _s > 0,
    'should return positive value when the content is enough large.'
  );

  body.style.height = parseInt(body.style.height, 10) + 1 + - _s + 'px';
  t.equal(
    getScrollMaxY(),
    1,
    'should return scrollable height of current page.'
  );
});
