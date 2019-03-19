(typeof window === 'undefined' ? global : window)
	.com
	.greensock
	.core
	.Animation
	.prototype
	.then = function (onFullfilled) {
		return new Promise(resolve => {
			const existing = this.eventCallback('onComplete');
			this.eventCallback('onComplete', function () {
				if (existing) {
					existing.apply(this, arguments);
				}
				onFullfilled();
				resolve();
			});
		});
	};
