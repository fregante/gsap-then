window.com.greensock.core.Animation.prototype.then = function (onFullfilled) {
	return new Promise(resolve => {
		const existing = this.eventCallback('onComplete');
		this.eventCallback('onComplete', () => {
			if (existing) {
				existing();
			}
			resolve();
		});
	}).then(onFullfilled);
};
