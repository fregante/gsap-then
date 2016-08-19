window.com.greensock.core.Animation.prototype.then = function (onFullfilled) {
	const tween = this;
	return new Promise(function (resolve) {
		if (tween.add) {
			tween.add(resolve);
		} else {
			tween.eventCallback('onComplete', resolve);
		}
	}).then(onFullfilled);
};
