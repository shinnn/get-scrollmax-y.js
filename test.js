var test = require('tape');
var getScrollMaxY = require('./dist/get-scrollmax-y.js');

var body = document.body;
body.style.margin = '0';
body.style.padding = '0';
body.style.height = '0';

test('window.scrollMaxY', function(t) {
  'use strict';

  t.plan(2);

  t.equal(getScrollMaxY(), 0);

  body.style.height = '500px';
  var _s = getScrollMaxY();
  body.style.height = 500 + 1 + - _s + 'px';
  t.equal(getScrollMaxY(), 1);
});
