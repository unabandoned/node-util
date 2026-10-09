'use strict';

// support/types.js used to call the which-typed-array package; it now reads
// the %TypedArray%.prototype[Symbol.toStringTag] getter itself. This checks
// that every predicate built on it answers exactly as which-typed-array would,
// for every typed array kind this engine has and for a spread of non-typed-arrays.
//
// Float16Array is behind --js-float16array on older Node: when the engine lacks
// it, the file re-runs itself with the flag so that kind is covered too.

var assert = require('assert');
var spawnSync = require('child_process').spawnSync;
var vm = require('vm');
var whichTypedArray = require('which-typed-array');
var types = require('../../').types;

var predicates = {
  Uint8Array: 'isUint8Array',
  Uint8ClampedArray: 'isUint8ClampedArray',
  Uint16Array: 'isUint16Array',
  Uint32Array: 'isUint32Array',
  Int8Array: 'isInt8Array',
  Int16Array: 'isInt16Array',
  Int32Array: 'isInt32Array',
  Float32Array: 'isFloat32Array',
  Float64Array: 'isFloat64Array',
  BigInt64Array: 'isBigInt64Array',
  BigUint64Array: 'isBigUint64Array'
};

var allNames = [
  'Float16Array', 'Float32Array', 'Float64Array',
  'Int8Array', 'Int16Array', 'Int32Array',
  'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array',
  'BigInt64Array', 'BigUint64Array'
];
var names = allNames.filter(function (name) {
  return typeof global[name] === 'function';
});

var otherRealm = vm.runInNewContext('this');
var cases = [];
function add(label, value) {
  cases.push({ label: label, value: value });
}

names.forEach(function (name) {
  var Ctor = global[name];
  add('new ' + name + '()', new Ctor());
  add('new ' + name + '(8)', new Ctor(8));
  add(name + ' over a buffer slice', new Ctor(new ArrayBuffer(64), 8, 2));
  var Sub = class extends Ctor {};
  add('subclass of ' + name, new Sub(4));
  if (typeof otherRealm[name] === 'function') {
    add(name + ' from another realm', new otherRealm[name](4));
  }
  var detached = new Ctor(4);
  if (typeof structuredClone === 'function') {
    structuredClone(detached.buffer, { transfer: [detached.buffer] });
    add('detached ' + name, detached);
  }
  add(name + '.prototype', Ctor.prototype);
  add(name + ' constructor', Ctor);
  add('Object.create(' + name + '.prototype)', Object.create(Ctor.prototype));
  add('proxy of ' + name, new Proxy(new Ctor(2), {}));
  var fake = {};
  fake[Symbol.toStringTag] = name;
  add('object tagged ' + name, fake);
  var retagged = new Ctor(2);
  Object.defineProperty(retagged, Symbol.toStringTag, { value: 'Nope' });
  add(name + ' with an own toStringTag', retagged);
});

add('Buffer', Buffer.from('abc'));
add('Object.getPrototypeOf(Uint8Array.prototype)', Object.getPrototypeOf(Uint8Array.prototype));
add('ArrayBuffer', new ArrayBuffer(8));
if (typeof SharedArrayBuffer === 'function') {
  add('SharedArrayBuffer', new SharedArrayBuffer(8));
}
add('DataView', new DataView(new ArrayBuffer(8)));
add('array', [1, 2, 3]);
add('array-like', { length: 2, 0: 1, 1: 2 });
add('plain object', {});
add('null-prototype object', Object.create(null));
add('function', function () {});
add('arrow function', () => {});
add('arguments', (function () { return arguments; }(1, 2)));
add('Map', new Map());
add('Set', new Set());
add('Date', new Date());
add('RegExp', /x/);
add('Error', new Error('x'));
add('boxed number', Object(1));
add('boxed string', Object('Uint8Array'));
add('string naming a typed array', 'Uint8Array');
add('number', 42);
add('bigint', BigInt(1));
add('symbol', Symbol('x'));
add('true', true);
add('false', false);
add('empty string', '');
add('zero', 0);
add('NaN', NaN);
add('null', null);
add('undefined', undefined);

cases.forEach(function (c) {
  var expected = whichTypedArray(c.value);
  assert.strictEqual(
    types.isTypedArray(c.value),
    !!expected,
    'isTypedArray(' + c.label + ')'
  );
  Object.keys(predicates).forEach(function (name) {
    assert.strictEqual(
      types[predicates[name]](c.value),
      expected === name,
      predicates[name] + '(' + c.label + ')'
    );
  });
});

// The kinds this engine has must each have been recognised by both sides,
// so the comparison above cannot pass vacuously.
names.forEach(function (name) {
  var value = new global[name](1);
  assert.strictEqual(whichTypedArray(value), name);
  assert.strictEqual(types.isTypedArray(value), true, 'isTypedArray(' + name + ')');
});

console.log(
  'which-typed-array equivalence: ' + cases.length + ' cases over ' +
  names.length + ' typed array kinds (' + names.join(', ') + ')'
);

if (names.indexOf('Float16Array') === -1 && !process.env.UTIL_TEST_FLOAT16) {
  var child = spawnSync(process.execPath, ['--js-float16array', __filename], {
    env: Object.assign({}, process.env, { UTIL_TEST_FLOAT16: '1' }),
    encoding: 'utf8'
  });
  if (child.status === 0) {
    process.stdout.write(child.stdout);
  } else if (/bad option/.test(child.stderr)) {
    console.log('which-typed-array equivalence: Float16Array unavailable on this Node, skipped');
  } else {
    process.stdout.write(child.stdout);
    process.stderr.write(child.stderr);
    process.exit(child.status || 1);
  }
}
