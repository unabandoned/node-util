# util change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [0.12.8](https://github.com/unabandoned/node-util/compare/util-v0.12.7...util-v0.12.8) (2026-08-17)


### Dependencies & maintenance

* **deps:** update unabandoned/.github action to v1.0.1 ([#11](https://github.com/unabandoned/node-util/issues/11)) ([bec86e5](https://github.com/unabandoned/node-util/commit/bec86e57154f12ae8d091fedfb8be4ed44d9bf7d))

## [0.12.7](https://github.com/unabandoned/node-util/compare/util-v0.12.6...util-v0.12.7) (2026-08-15)


### Dependencies & maintenance

* add .unabandoned.yml dashboard metadata ([#8](https://github.com/unabandoned/node-util/issues/8)) ([449fc6b](https://github.com/unabandoned/node-util/commit/449fc6b5e0355fb1bbb2f1119072613c741f4c9f))
* **deps:** pin dependencies ([#3](https://github.com/unabandoned/node-util/issues/3)) ([ec32fd6](https://github.com/unabandoned/node-util/commit/ec32fd672f5afc077281bcafe6729cf0bb28bded))
* **deps:** update unabandoned/.github digest to 461710f ([#7](https://github.com/unabandoned/node-util/issues/7)) ([091a231](https://github.com/unabandoned/node-util/commit/091a231e7c45b4e77e3f7de55fc1bcd26903c3f4))
* **deps:** update unabandoned/.github digest to ae2bd5a ([#4](https://github.com/unabandoned/node-util/issues/4)) ([311a579](https://github.com/unabandoned/node-util/commit/311a579f6bb4366d5d62022f068a39b2fb3487aa))
* drop the two abandoned-on-abandoned type checks from the runtime tree ([#10](https://github.com/unabandoned/node-util/issues/10)) ([9cc08f3](https://github.com/unabandoned/node-util/commit/9cc08f3bae5dea65a9d3b04d529ed28673b39b60))
* pin reusable workflows to the @unabandoned/.github v1.0.0 release ([#9](https://github.com/unabandoned/node-util/issues/9)) ([0e89571](https://github.com/unabandoned/node-util/commit/0e89571afadeeafff1e15d9716c66f5f19d1f7ef))

## [0.12.6](https://github.com/unabandoned/node-util/compare/util-v0.12.5...util-v0.12.6) (2026-08-14)


### Features

* avoid SharedArrayBuffer until required ([de16a49](https://github.com/unabandoned/node-util/commit/de16a4905b06bd878ebc6c061f5300fe6f39979d))
* onboard as @unabandoned/util with a maintained dependency tree ([#1](https://github.com/unabandoned/node-util/issues/1)) ([e27b125](https://github.com/unabandoned/node-util/commit/e27b12573d1110215219ea327c47006016c8d231))


### Bug Fixes

* handle SharedArrayBuffer not existing ([6a8d35c](https://github.com/unabandoned/node-util/commit/6a8d35c040aa88c0c5ae998f446fad9e4e3e6871))
* remove getter, store copy of SAB ([62f00fd](https://github.com/unabandoned/node-util/commit/62f00fd96de23ba82685b819f7ecfb20b94a9bc6))


### Dependencies & maintenance

* move safe-buffer to devDependencies, fixes [#65](https://github.com/unabandoned/node-util/issues/65) ([e84cfd5](https://github.com/unabandoned/node-util/commit/e84cfd5e4923631d012e578d7aa140412a475646))
* nicer matrix ([2fe437a](https://github.com/unabandoned/node-util/commit/2fe437acc608f8cf63152b88d964196da39a2a92))
* replace deprecated String.prototype.substr() ([a292d8a](https://github.com/unabandoned/node-util/commit/a292d8a73ac877cc9a0ae64b287cc064dcbacb54))
* replace deprecated String.prototype.substr() ([073daed](https://github.com/unabandoned/node-util/commit/073daedb56d8737ac0e5e5f76559d83cbf3d659b))

## 0.12.5
* Move `safe-buffer` dependency to a dev-only dependency. ([@goto-bus-stop](https://github.com/goto-bus-stop) in [e84cfd5](https://github.com/browserify/node-util/commit/e84cfd5e4923631d012e578d7aa140412a475646))
* Document usage with webpack 5+. ([@MatrixFrog](https://github.com/MatrixFrog) in [#69](https://github.com/browserify/node-util/pull/69))

## 0.12.4
* Avoid SharedArrayBuffer until required. ([@snyamathi](https://github.com/snyamathi) in [#59](https://github.com/browserify/node-util/pull/59))

  This fixes a [security warning](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes) for SharedArrayBuffer.

## 0.12.3
* Use robust `which-typed-array`, `is-typed-array` modules for the `util.types.isTypedArray` family of functions. ([@wbinnssmith](https://github.com/wbinnssmith) in [#47](https://github.com/browserify/node-util/pull/47))

  This fixes crash in IE11 when a polyfilled `Symbol` is available in the environment.

## 0.12.2
* Move `object.entries` dependency to a dev-only dependency. ([@goto-bus-stop](https://github.com/goto-bus-stop) in [622f036](https://github.com/browserify/node-util/commit/622f0361540997e7e7b8abcff9865b47b2fa658c))

## 0.12.1
* Update `util.debuglog` compatibility to Node 10.4.0. ([@goto-bus-stop](https://github.com/goto-bus-stop) in [#27](https://github.com/browserify/node-util/pull/27))
* Allow newer versions of `inherits`. ([@snyamathi](https://github.com/snyamathi) in [#39](https://github.com/browserify/node-util/pull/39))

## 0.12.0
* Add `util.types`. ([@lukechilds](https://github.com/lukechilds) in [#32](https://github.com/browserify/node-util/pull/35))

## 0.11.1
* Fix an infinite loop in `util.deprecate` some build configurations. ([@bernardmcmanus](https://github.com/bernardmcmanus) in [#12](https://github.com/browserify/node-util/pull/12))

## 0.11.0
* Add `util.promisify`.
* Add `util.callbackify`.

## 0.10.4
* Update `inherits` dependency.
