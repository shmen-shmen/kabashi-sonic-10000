import {
	startRecording,
	abortRecording,
	stopRecording,
} from "../actions/actions";

import { actx } from "../slidersSlice";
import { audioBufferToWav } from "./encoder";

let mediaRecorder;

export const startRecordingAsync = (streamDst) => async (dispatch) => {
	dispatch(startRecording());

	const chunks = [];
	mediaRecorder = new MediaRecorder(streamDst.stream);
	mediaRecorder.start();

	// async action
	mediaRecorder.ondataavailable = (evt) => {
		chunks.push(evt.data);
	};

	mediaRecorder.onstop = async () => {
		const dataIsEmpty = chunks[0]["size"] == 0;
		if (dataIsEmpty) {
			dispatch(abortRecording());
			return;
		}

		const date = new Date();
		let clipName = prompt(
			"Enter a name for your tune 🐏",
			"rec on " + date.toLocaleString()
		);

		if (clipName === null) {
			dispatch(abortRecording());
			return;
		}

		const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

		const arrayBuffer = await blob.arrayBuffer();
		const audioBuffer = await actx.decodeAudioData(arrayBuffer);
		const audioUrl = audioBufferToWav(audioBuffer);

		dispatch(
			stopRecording({ audioUrl, clipName, isPlaying: false, timeline: 0 })
		);
	};
};

export const stopRecordingAsync = () => async (dispatch) => {
	mediaRecorder.stop();
};
