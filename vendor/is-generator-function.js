'use strict';

// Vendored from is-generator-function@1.1.2 (MIT, Jordan Harband).
//
// The function is fifteen lines, but it reached for five helpers to get there —
// call-bound, safe-regex-test, has-tostringtag, get-proto and generator-function —
// and those pull the es-intrinsics set in behind them. Vendoring it is cheaper than
// carrying that for one predicate.
//
// The logic is upstream's, in the same order, with each helper replaced by what it
// resolves to on an engine that has Symbol.toStringTag and Object.getPrototypeOf —
// which this package already requires (engines: node >= 22.12).
//
// The generator constructor is still obtained the indirect way upstream obtains it:
// writing `function*` in this file would be transpiled by a consumer's bundler into
// something whose prototype no longer matches a real generator's.

var toStr = Function.prototype.call.bind(Object.prototype.toString);
var fnToStr = Function.prototype.call.bind(Function.prototype.toString);
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var GeneratorFunction;
function getGeneratorFunction() {
  if (typeof GeneratorFunction !== 'undefined') {
    return GeneratorFunction;
  }
  try {
    GeneratorFunction = Function('return function*() {}')().constructor;
  } catch (e) {
    GeneratorFunction = null;
  }
  return GeneratorFunction;
}

module.exports = function isGeneratorFunction(fn) {
  if (typeof fn !== 'function') {
    return false;
  }
  if (isFnRegex.test(fnToStr(fn))) {
    return true;
  }
  if (!hasToStringTag) {
    return toStr(fn) === '[object GeneratorFunction]';
  }
  var GenFn = getGeneratorFunction();
  return !!GenFn && Object.getPrototypeOf(fn) === GenFn.prototype;
};
