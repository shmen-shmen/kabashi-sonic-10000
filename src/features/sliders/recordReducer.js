import { createReducer } from "@reduxjs/toolkit";

import {
	startRecording,
	stopRecording,
	abortRecording,
	deleteRecord,
	playRecord,
	stopRecord,
	scrubRecord,
} from "./actions/actions";

const initialState = {
	isRecording: false,
	records: [
		{ audioUrl: "penis", clipName: "chlen", isPlaying: false, timeline: 0 },
		{ audioUrl: "penis", clipName: "chlen", isPlaying: false, timeline: 0 },
		{ audioUrl: "penis", clipName: "chlen", isPlaying: false, timeline: 0 },
	],
};

//separate reducer to handle asynchronous stuff
const recorderReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(startRecording, (state) => {
			state.isRecording = true;
		})
		.addCase(stopRecording, (state, action) => {
			state.isRecording = false;
			state.records = [...state.records, action.payload];
		})
		.addCase(abortRecording, (state, action) => {
			state.isRecording = false;
		})
		.addCase(deleteRecord, (state, action) => {
			state.records.splice(action.payload, 1);
		})
		.addCase(playRecord, (state, action) => {
			state.records[action.payload].isPlaying = true;
		})
		.addCase(stopRecord, (state, action) => {
			state.records[action.payload].isPlaying = false;
		})
		.addCase(scrubRecord, (state, action) => {
			const { index, timeline } = action.payload;
			state.records[index].timeline = timeline;
		});
});

export default recorderReducer;
