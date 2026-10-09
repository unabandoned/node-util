'use strict';

// util.inherits used to be the inherits package; in a bundle that was its
// browser implementation. It is now inlined, and this pins the behaviour the
// package had: super_, a fresh prototype from Object.create, a non-enumerable
// constructor, and a silent no-op for a missing superCtor.

var assert = require('assert');
var util = require('../../');

function Base(x) { this.x = x; }
Base.prototype.hello = function () { return 'hello ' + this.x; };

function Child(x) { Base.call(this, x); }
var before = Child.prototype;
assert.strictEqual(util.inherits(Child, Base), undefined);

assert.strictEqual(Child.super_, Base);
assert.ok(Object.prototype.propertyIsEnumerable.call(Child, 'super_'));
assert.notStrictEqual(Child.prototype, before);
assert.strictEqual(Object.getPrototypeOf(Child.prototype), Base.prototype);
assert.deepStrictEqual(Object.getOwnPropertyNames(Child.prototype), ['constructor']);
assert.deepStrictEqual(
  Object.getOwnPropertyDescriptor(Child.prototype, 'constructor'),
  { value: Child, enumerable: false, writable: true, configurable: true }
);

var c = new Child('world');
assert.ok(c instanceof Child);
assert.ok(c instanceof Base);
assert.strictEqual(c.hello(), 'hello world');
assert.strictEqual(c.constructor, Child);

// Works for ES classes and built-ins as the super constructor too.
function MyError(msg) { Error.call(this); this.message = msg; }
util.inherits(MyError, Error);
assert.ok(new MyError('x') instanceof Error);
assert.strictEqual(MyError.super_, Error);

class K {}
function L() {}
util.inherits(L, K);
assert.strictEqual(Object.getPrototypeOf(L.prototype), K.prototype);

// A falsy superCtor leaves ctor untouched rather than throwing.
function Lone() {}
var loneProto = Lone.prototype;
[undefined, null, 0, ''].forEach(function (falsy) {
  util.inherits(Lone, falsy);
  assert.strictEqual(Lone.prototype, loneProto);
  assert.ok(!('super_' in Lone));
});

// Side by side with the browser build of the inherits package (a
// devDependency kept for this comparison only).
var original = require('inherits/inherits_browser.js');
function A() {}
function B() {}
original(A, Base);
util.inherits(B, Base);
assert.deepStrictEqual(Object.getOwnPropertyNames(A).sort(), Object.getOwnPropertyNames(B).sort());
assert.deepStrictEqual(
  Object.getOwnPropertyDescriptor(A, 'super_'),
  Object.getOwnPropertyDescriptor(B, 'super_')
);
assert.deepStrictEqual(Object.getOwnPropertyNames(A.prototype), Object.getOwnPropertyNames(B.prototype));
var descA = Object.getOwnPropertyDescriptor(A.prototype, 'constructor');
var descB = Object.getOwnPropertyDescriptor(B.prototype, 'constructor');
assert.strictEqual(descA.value, A);
assert.strictEqual(descB.value, B);
delete descA.value;
delete descB.value;
assert.deepStrictEqual(descA, descB);
assert.strictEqual(Object.getPrototypeOf(A.prototype), Object.getPrototypeOf(B.prototype));

console.log('inherits: ok');
