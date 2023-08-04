import { createReducer } from "@reduxjs/toolkit";

import { startRecording, stopRecording, deleteRecord } from "./actions/actions";

const initialState = {
	isRecording: false,
	records: [],
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
		.addCase(deleteRecord, (state, action) => {
			console.log(action.payload);
			state.records.splice(action.payload, 1);
		});
});

export default recorderReducer;
