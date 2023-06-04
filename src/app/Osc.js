export default class Osc {
	constructor(actx, type, frequency, detune, envelope, connection) {
		this.actx = actx;
		//stupid i know, but otherwise get some error
		this.envelope = envelope;
		this.attack = this.envelope.attack;
		this.decay = this.envelope.decay;
		this.sustain = this.envelope.sustain;
		this.release = this.envelope.release;
		//stupid i know, but otherwise get some error
		this.osc = actx.createOscillator();
		this.osc.frequency.value = frequency;
		this.osc.detune.value = detune;
		this.osc.type = type;
		this.gateGain = actx.createGain();
		this.gateGain.gain.value = 0;
		this.osc.connect(this.gateGain);
		this.gateGain.connect(connection);
		this.easing = 0.005;
		this.osc.start();
		this.start();
	}
	start() {
		let { currentTime } = this.actx;
		console.log(this.attack, this.decay, this.sustain, this.release);
		this.gateGain.gain.cancelScheduledValues(currentTime);
		this.gateGain.gain.setValueAtTime(0, (currentTime = this.easing));
		this.gateGain.gain.linearRampToValueAtTime(
			1,
			currentTime + this.attack + this.easing
		);
		this.gateGain.gain.linearRampToValueAtTime(
			this.sustain,
			currentTime + this.attack + this.decay + this.easing
		);
	}
	stop() {
		let { currentTime } = this.actx;
		this.gateGain.gain.cancelScheduledValues(currentTime);
		this.gateGain.gain.setTargetAtTime(
			0,
			currentTime,
			this.release + this.easing
		);
		setTimeout(() => {
			this.osc.disconnect();
		}, 10000);
	}
}
