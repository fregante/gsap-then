# gsap-then

> Make every GSAP Tween a promise

[![gzipped size](https://badges.herokuapp.com/size/github/bfred-it/gsap-then/master/dist/gsap-then.browser.js?gzip=true&label=gzipped%20size)](#readme)
[![Travis build status](https://api.travis-ci.org/bfred-it/gsap-then.svg?branch=master)](https://travis-ci.org/bfred-it/gsap-then)
[![gzipped size](https://img.shields.io/npm/v/gsap-then.svg)](https://www.npmjs.com/package/gsap-then) 

Once loaded, every GSAP tween (TweenLite, TimelineLite, TweenMax, TimelineMax) will automatically be a promise. See the [usage examples](#usage) to see what this enables.

## Install

```sh
npm install --save gsap-then
```

```js
import 'gsap';
import 'gsap-then';
```

Or include the file `dist/gsap-then.browser.js` after loading Greensock.

## Usage

```js
TweenLite.to('.title', 1, {opacity: 0}).then(function () {
	console.log('Done animating title');
})
```

```js
Promise.all([
	TweenLite.to('.title', 1, {opacity: 0}),
	loadImage('img.jpg') // http://npm.im/image-promise
]).then(function () {
	console.log('Animation done and image loaded');
});
```

```js
var tl = new TimelineMax();
tl.to('.title', 1, {opacity: 0});
tl.then(function () {
	console.log('Timeline done');
})
```

```js
var tl = new TimelineMax();
tl.to('.title', 1, {opacity: 0});
tl.then(function () {
	console.log('Title animated');
})
tl.to('.body', 1, {opacity: 0});
tl.then(function () {
	console.log('Timeline done');
})
```

## Notes

When you call `.then()` a new Promise is generated. 

- Simple tweens: the promise it's resolved with the callback `onComplete`
- Timelines: it's added to the timeline with `.add`

This has two limitations:

- Simple tweens: `.then` can only be called once and will override any previous `onComplete` callback.
- Timelines: `.then` doesn't mark the official completion of the timeline unless it's the last method you call.

These limitations are there because GSAP only supports one callback at a time (i.e. there can't be more than on `onComplete`).

**Also:** because these are promises, they are only resolved once, not every time the timeline is completed.

## Dependencies

No direct dependencies, but you'll also need to load

* GSAP, even just TweenLite
* `window.Promise` is available in Edge 12+ and all the [other browsers.](http://caniuse.com/#feat=promises)

## Related

* [tweenlite-stagger](https://github.com/bfred-it/tweenlite-stagger): Avoid TweenMax. Use TweenLite.stagger with the help of TimelineLite

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
