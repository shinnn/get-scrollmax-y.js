'use strict';

var getScrollMaxY;

if (typeof window.scrollMaxY === 'number') {
  getScrollMaxY = () => window.scrollMaxY;
} else {
  let {body, documentElement: html} = document;

  let getInnerHeight;

  if (typeof window.innerHeight === 'number') {
    getInnerHeight = () => window.innerHeight;
  } else {
    getInnerHeight = () => html.clientHeight || body.clientHeight;
  }

  let getScrollHeight = () => Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight
  );

  getScrollMaxY = () => getScrollHeight() - getInnerHeight();
}
