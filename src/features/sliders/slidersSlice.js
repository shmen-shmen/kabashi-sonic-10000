import { createSlice } from "@reduxjs/toolkit";
import Osc from "../../app/osc";
import createEchoDelayEffect from "../../app/delay";

//audio context, master gain (gain1), output node are initiated
let actx = new AudioContext();
let out = actx.destination;

let gain1 = actx.createGain();
gain1.gain.value = 0.5;
let filter = actx.createBiquadFilter();
filter.connect(gain1);
gain1.connect(out);

//active notes (pressed keys on keyboard)
let nodes = {};

// echo delay is plugged into signal chain with bypass on (no echo effect)
let echoDelay = createEchoDelayEffect(actx);
echoDelay.placeBetween(gain1, out);

const initialState = {
	canSee: false,

	osc1Settings: {
		detune: 0,
		types: ["sine", "square", "sawtooth", "triangle"],
		type: "sine",
	},

	masterGain: gain1.gain.value,

	envelope: {
		attack: 0.005,
		peak: 1,
		decay: 0.1,
		sustain: 0.6,
		release: 0.1,
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

	delaySettings: {
		isOn: echoDelay.isApplied(),
		dryWet: echoDelay.dryWetValue(),
		delayTime: echoDelay.timeValue(),
	},
};

export const slidersSlice = createSlice({
	name: "sliders",
	initialState,
	reducers: {
		changeOsc1: (state, action) => {
			const { id, value } = action.payload;
			state.osc1Settings = { ...state.osc1Settings, [id]: value };
		},
		resetOsc1: (state, action) => {
			const { id } = action.payload;
			state.osc1Settings = {
				...state.osc1Settings,
				[id]: initialState.osc1Settings[id],
			};
		},
		changeMasterGain: (state, action) => {
			const { value } = action.payload;
			state.masterGain = value;
			gain1.gain.linearRampToValueAtTime(value, actx.currentTime + 0.05);
		},
		changeEnvelope: (state, action) => {
			const { id, value } = action.payload;
			state.envelope = {
				...state.envelope,
				// the value that gets sent from event listener is a string
				[id]: Number(value),
			};
		},
		resetEnvelope: (state, action) => {
			const { id } = action.payload;
			state.envelope = {
				...state.envelope,
				[id]: initialState.envelope[id],
			};
		},
		changeFilter: (state, action) => {
			const { id, value } = action.payload;
			state.filterSettings = { ...state.filterSettings, [id]: value };
			switch (id) {
				case "gain":
					filter.gain.linearRampToValueAtTime(
						value / 1000,
						actx.currentTime + 0.05
					);
					break;
				case "type":
					filter.type = value;
					break;
				default:
					filter[id].exponentialRampToValueAtTime(
						value,
						actx.currentTime + 0.05
					);
					break;
			}
		},
		resetFilter: (state, action) => {
			const { id } = action.payload;
			state.filterSettings = {
				...state.filterSettings,
				[id]: initialState.filterSettings[id],
			};
			switch (id) {
				case "gain":
					filter.gain.linearRampToValueAtTime(
						initialState.filterSettings[id],
						actx.currentTime + 0.05
					);
					break;
				case "type":
					filter.type = initialState.filterSettings[id];
					break;
				default:
					filter[id].exponentialRampToValueAtTime(
						initialState.filterSettings[id],
						actx.currentTime + 0.05
					);
					break;
			}
		},
		makeOsc: (state, action) => {
			let { note, freq } = action.payload;
			let newOsc = new Osc(
				actx,
				state.osc1Settings.type,
				freq,
				state.osc1Settings.detune,
				state.envelope,
				filter
			);
			freq = Math.round(freq);
			nodes[freq] = newOsc;
		},
		killOsc: (state, action) => {
			let { note, freq } = action.payload;
			freq = Math.round(freq);

			if (nodes[freq]) {
				nodes[freq].stop();
				delete nodes[freq];
			}
		},
		// toggleDelay: (state) => {
		// 	let dryWet, isOn;
		// 	if (echoDelay.isApplied()) {
		// 		dryWet = 0;
		// 		isOn = false;
		// 		echoDelay.discard();
		// 	} else {
		// 		dryWet = 1;
		// 		isOn = true;
		// 		echoDelay.apply();
		// 	}
		// 	state.delaySettings = {
		// 		...state.delaySettings,
		// 		isOn: isOn,
		// 		dryWet: dryWet,
		// 	};
		// },
		changeDelay: (state, action) => {
			const { id, value } = action.payload;
			state.delaySettings = { ...state.delaySettings, [id]: value };
			switch (id) {
				case "dryWet":
					echoDelay.changeDryWet(value);
					break;
				case "delayTime":
					echoDelay.changeTime(value);
					break;
				default:
					break;
			}
		},
		show: (state) => {
			state.canSee = Math.random() * 11;
		},
	},
});

export const {
	changeOsc1,
	resetOsc1,
	changeMasterGain,
	changeEnvelope,
	resetEnvelope,
	changeFilter,
	resetFilter,
	makeOsc,
	killOsc,
	// toggleDelay,
	changeDelay,
	show,
} = slidersSlice.actions;

export default slidersSlice.reducer;
