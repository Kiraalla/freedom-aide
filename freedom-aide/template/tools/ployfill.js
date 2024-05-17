exports.contentFile = `
// @ts-nocheck
/**
 * 去除谷歌浏览器的scroll、wheel等事件警告
 */
(function () {
  if (typeof EventTarget !== "undefined") {
    let func = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
      let passive = false;
      if (typeof capture === "object") {
        passive = capture.passive || false;
        capture.passive = false;
      } else {
        passive = !!capture;
        capture = { passive: false };
      }
      func.call(this, type, fn, { ...capture, passive });
    };
  }
}());
`