export default function createEchoDelayEffect(ctx) {
	const delay = ctx.createDelay(1);
	const dryNode = ctx.createGain();
	const wetNode = ctx.createGain();
	const mixer = ctx.createGain();
	const filter = ctx.createBiquadFilter();
	const easing = 0.005;

	delay.delayTime.value = 0.75;
	dryNode.gain.value = 1;
	wetNode.gain.value = 0;
	filter.frequency.value = 1100;
	filter.type = "highpass";

	return {
		apply: function () {
			wetNode.gain.setValueAtTime(0.75, ctx.currentTime);
		},
		discard: function () {
			wetNode.gain.setValueAtTime(0, ctx.currentTime);
		},
		isApplied: function () {
			return wetNode.gain.value > 0;
		},
		placeBetween: function (inputNode, outputNode) {
			inputNode.connect(delay);
			delay.connect(wetNode);
			wetNode.connect(filter);
			filter.connect(delay);

			inputNode.connect(dryNode);
			dryNode.connect(mixer);
			wetNode.connect(mixer);
			mixer.connect(outputNode);
		},
		timeValue: function () {
			return delay.delayTime.value;
		},
		dryWetValue: function () {
			return wetNode.gain.value;
		},
		changeTime: function (newTime) {
			delay.delayTime.linearRampToValueAtTime(newTime, easing);
		},
		changeDryWet: function (newGain) {
			wetNode.gain.linearRampToValueAtTime(newGain, easing);
		},
	};
}
