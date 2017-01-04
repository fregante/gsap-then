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

* Calling `.then()` generates a new Promise.
* The generated Promise is resolved the next time GSAP calls `onComplete`
* The Promise is only resolved once, so if you restart the animation, nothing new will happen—unless you generate a new Promise.
* If the tween already has an `onComplete` callback, it will be replaced by the Promise, but it will still work.
* Don't remove or set a new `onComplete` callback **after** calling `.then()` because this will override the Promise (i.e. it will never be resolved)

## Dependencies

*  Load `gsap` or simply `TweenLite` before `gsap-then`.
* `window.Promise` is available in Edge 12+ and all the [other browsers.](http://caniuse.com/#feat=promises)

## Related

* [GSAP](https://github.com/greensock/GreenSock-JS): GreenSock Animation Platform, duh!

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)

gsap-then is NOT affiliated with, endorsed, or sponsored by GreenSock, Inc.
