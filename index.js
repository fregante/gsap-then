(typeof window === 'undefined' ? global : window)
	.com
	.greensock
	.core
	.Animation
	.prototype
	.whenDone = function () {
		if (arguments.length > 0) {
			throw new TypeError('No arguments should be passed to `.whenDone()`. The method returns a promise. Use `tl.whenDone().then(fn)` or `await tl.whenDone()`');
		}

		return new Promise(resolve => {
			const existing = this.eventCallback('onComplete');
			this.eventCallback('onComplete', function () {
				if (existing) {
					existing.apply(this, arguments);
				}
				resolve(this);
			});
		});
	};
