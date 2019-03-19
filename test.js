import test from 'ava';
import {
	TweenLite,
	TweenMax,
	TimelineLite,
	TimelineMax
} from 'gsap';

global.window = {
	com: global.com
};

const help = {
	TweenLite: class {
		constructor() {
			return TweenLite.set({}, {});
		}
	},
	TweenMax: class {
		constructor() {
			return TweenMax.set({}, {});
		}
	}
};

require('./index.js');

[
	help.TweenLite,
	help.TweenMax,
	TimelineLite,
	TimelineMax
].forEach(Tween => {
	test(Tween.name + ': base setting', t => {
		const tl = new Tween();
		t.is(typeof tl.eventCallback('onComplete'), 'undefined');
		tl.whenDone().then(() => {});
		t.is(typeof tl.eventCallback('onComplete'), 'function');
	});

	test.cb(Tween.name + ': calling the callback (gsap native)', t => {
		const tl = new Tween();
		tl.eventCallback('onComplete', () => t.end());
		tl.progress(1, false); // Mark tween as "done"
	});

	test.cb(Tween.name + ': calling the callback (whenDone)', t => {
		const tl = new Tween();
		tl.whenDone().then(() => t.end());
		tl.progress(1, false); // Mark tween as "done"
	});

	test(Tween.name + ': calling the callback (await)', async t => {
		const tl = new Tween();
		setTimeout(() => tl.progress(1, false)); // Mark tween as "done"

		t.is(await tl.whenDone(), tl);
	});

	test.cb(Tween.name + ': calling the callback (gsap native + whenDone)', t => {
		t.plan(2);
		const tl = new Tween();
		tl.eventCallback('onComplete', () => t.pass());
		tl.whenDone().then(() => {
			t.pass();
			t.end();
		});

		tl.progress(1, false); // Mark tween as "done"
	});

	test(Tween.name + ': calling the callback (gsap native + await)', async t => {
		t.plan(2);
		const tl = new Tween();
		setTimeout(() => tl.progress(1, false)); // Mark tween as "done"

		tl.eventCallback('onComplete', () => t.pass());
		await tl.whenDone();
		t.pass();
	});
});
