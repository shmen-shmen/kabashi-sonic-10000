import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import Osc from "../../app/Osc";

let actx = new AudioContext();
let out = actx.destination;

let gain1 = actx.createGain();
gain1.gain.value = 0.5;
let filter = actx.createBiquadFilter();

gain1.connect(filter);
filter.connect(out);

let nodes = {};

const initialState = {
	osc1Settings: {
		detune: 0,
		types: ["sine", "square", "sawtooth", "triangle"],
		type: "sine",
	},

	envelope: {
		attack: 0.005,
		decay: 0.1,
		sustain: 0.6,
		release: 0.1,
	},

	isMute: false,

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
};

export const slidersSlice = createSlice({
	name: "sliders",
	initialState,
	reducers: {
		changeOsc1: (state, action) => {
			const { id, value } = action.payload;
			state.osc1Settings = { ...state.osc1Settings, [id]: value };
		},
		muteSwitch: (state) => {
			state.isMute = !state.isMute;
			if (gain1.gain.value === 0.5) {
				gain1.gain.exponentialRampToValueAtTime(
					0.0001,
					actx.currentTime + 0.05
				);
			} else {
				gain1.gain.exponentialRampToValueAtTime(0.5, actx.currentTime + 0.05);
			}
		},
		changeEnvelope: (state, action) => {
			const { id, value } = action.payload;
			state.envelope = { ...state.envelope, [id]: parseFloat(value, 1000) };
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
		detuneToZero: (state) => {
			state.osc1Settings = { ...state.osc1Settings, detune: 0 };
		},
		makeOsc: (state, action) => {
			let { note, freq } = action.payload;
			let newOsc = new Osc(
				actx,
				state.osc1Settings.type,
				freq,
				state.osc1Settings.detune,
				state.envelope,
				gain1
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
	},
});

// Action creators are generated for each case reducer function
export const {
	changeOsc1,
	changeFilter,
	detuneToZero,
	makeOsc,
	killOsc,
	changeEnvelope,
} = slidersSlice.actions;

export default slidersSlice.reducer;
