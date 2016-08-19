window.com.greensock.core.Animation.prototype.then = function (onFullfilled) {
	return new Promise(resolve => {
		if (this.add) {
			this.add(resolve);
		} else {
			this.eventCallback('onComplete', resolve);
		}
	}).then(onFullfilled);
};
