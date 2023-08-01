// a class that creates an oscillator (makes a sound)
export default class Osc {
	// constructor takes freq value from keyboard and else from controls
	constructor(actx, type, frequency, detune, envelope, connection) {
		this.actx = actx;

		//stupid i know, but otherwise get some error
		this.envelope = envelope || {
			attack: 0.005,
			peak: 1,
			decay: 0.1,
			sustain: 0.6,
			release: 0.1,
		};
		this.attack = this.envelope.attack;
		this.peak = this.envelope.peak;
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
		console.log("key fired");
		// otherwise all sorts of weird gain behaviour on each key press (and release)
		this.gateGain.gain.cancelScheduledValues(currentTime);
		// gain raises to peak value in attack time, then drops to sustain in release time and stays there as long as the button is pressed
		this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
		this.gateGain.gain.linearRampToValueAtTime(
			this.peak,
			currentTime + this.attack + this.easing
		);
		this.gateGain.gain.linearRampToValueAtTime(
			this.sustain,
			currentTime + this.attack + this.decay + this.easing
		);
	}

	stop() {
		let { currentTime } = this.actx;
		let timeout = (this.release + this.easing) * 1000;
		this.gateGain.gain.cancelScheduledValues(currentTime);
		// as soon as the button is released, gain drops to 0 in release time
		this.gateGain.gain.setTargetAtTime(
			0,
			currentTime,
			this.release + this.easing
		);
		// after some time the osc is disonnected
		setTimeout(() => {
			this.osc.disconnect();
		}, 10000);
	}
}
