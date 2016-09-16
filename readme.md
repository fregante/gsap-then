# <img src="https://rawgit.com/bfred-it/gsap-then/master/logo.svg" width="45" align="left"> gsap-then

> Make every GSAP Tween a promise

[![gzipped size](https://badges.herokuapp.com/size/github/bfred-it/gsap-then/master/dist/gsap-then.browser.js?gzip=true&label=gzipped%20size)](#readme)
[![Travis build](https://api.travis-ci.org/bfred-it/gsap-then.svg?branch=master)](https://travis-ci.org/bfred-it/gsap-then)
[![npm link](https://img.shields.io/npm/v/gsap-then.svg)](https://www.npmjs.com/package/gsap-then) 

Once loaded, every GSAP tween (TweenLite, TimelineLite, TweenMax, TimelineMax) will automatically be a promise. See the [usage examples](#usage) to see what this enables.

## Install

```sh
npm install --save gsap-then
```

```js
import 'gsap';
import 'gsap-then';
```

Or include the file `dist/gsap-then.browser.js` after loading GreenSock.

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
var tl = new TimelineLite();
tl.then(function (timeline) {
	console.log('Timeline completed:', timeline);
})
tl.to('.title', 1, {opacity: 0});
```

## Notes

When you call `.then()` a new Promise is generated and it's resolved once GSAP's `onComplete` is reached.

If the tween already has an `onComplete` callback it will be replaced by the Promise resolver but it will still work. But if you apply a new `onComplete` callback after calling `.then()` the  promise will be overridden.

**Note:** because these are promises, they are only resolved once, not every time the timeline is completed. If you want it to be resolved every time, then you don't need a promise, just use `onComplete`.

## Dependencies

No direct dependencies, but you'll also need to load before `gsap-then`:

* GSAP, even just TweenLite
* `window.Promise` is available in Edge 12+ and all the [other browsers.](http://caniuse.com/#feat=promises)

## Related

* [GSAP](https://github.com/greensock/GreenSock-JS): GreenSock Animation Platform, duh!
* [tweenlite-stagger](https://github.com/bfred-it/tweenlite-stagger): Avoid TweenMax. Use `TweenLite.stagger` with the help of TimelineLite

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)

gsap-then is NOT affiliated with, endorsed, or sponsored by GreenSock, Inc.
