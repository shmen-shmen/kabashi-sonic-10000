import React from "react";

let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();
gain1.gain.value = 0.5;
let filter = actx.createBiquadFilter();
let masterGain = actx.createGain();
masterGain.gain.value = 0.5;

osc1.connect(gain1);
gain1.connect(filter);
filter.connect(masterGain);
masterGain.connect(out);

const CTX = React.createContext();
export { CTX };

export function reducer(state, action) {
	switch (action.type) {
		case "START OSC":
			// web audio start osc
			return { ...state };
		case "default":
			console.log("reducer error, action: " + action);
			return { ...state };
	}
}

export default function Store(props) {
	const stateHook = React.useReducer(reducer, {
		osc1Settings: {
			frequency: osc1.frequency.value,
			detune: osc1.detune.value,
			volume: gain1.gain.value * 1000,
			types: ["sine", "square", "sawtooth", "triangle"],
			type: osc1.type,
		},
		filterSettings: {
			frequency: filter.frequency.value,
			detune: filter.detune.value,
			Q: filter.Q.value,
			gain: filter.gain.value,
			types: [
				"lowpass",
				"highpass",
				"bandpass",
				"lowshelf",
				"highshelf",
				"peaking",
				"notch",
				"allpass",
			],
			type: filter.type,
		},
		isMute: false,
	});
	return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
