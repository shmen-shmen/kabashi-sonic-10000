import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

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

const initialState = {
	osc1Settings: {
		frequency: osc1.frequency.value,
		detune: osc1.detune.value,
		volume: gain1.gain.value * 1000,
		types: ["sine", "square", "sawtooth", "triangle"],
		type: osc1.type,
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
		startOsc1: (state) => {
			osc1.start();
			return state;
		},
		changeOsc1: (state, action) => {
			const { id, value } = action.payload;
			state.osc1Settings = { ...state.osc1Settings, [id]: value };
			switch (id) {
				case "volume":
					gain1.gain.exponentialRampToValueAtTime(
						value / 1000,
						actx.currentTime + 0.05
					);
					break;
				case "type":
					osc1.type = value;
					break;
				default:
					osc1[id].linearRampToValueAtTime(value, actx.currentTime + 0.05);
					break;
			}
		},
		muteSwitch: (state) => {
			state.isMute = !state.isMute;
			if (masterGain.gain.value === 0.5) {
				masterGain.gain.exponentialRampToValueAtTime(
					0.0001,
					actx.currentTime + 0.05
				);
			} else {
				masterGain.gain.exponentialRampToValueAtTime(
					0.5,
					actx.currentTime + 0.05
				);
			}
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
			osc1.detune.linearRampToValueAtTime(0, actx.currentTime + 0.05);
		},
	},
});

// Action creators are generated for each case reducer function
export const { startOsc1, changeOsc1, muteSwitch, changeFilter, detuneToZero } =
	slidersSlice.actions;

export default slidersSlice.reducer;
