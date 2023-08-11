import {
	startRecording,
	abortRecording,
	stopRecording,
} from "../actions/actions";

import { actx } from "../slidersSlice";
import { audioBufferToWav } from "../encoder";
// ***
// THE EASY WAY
// ***
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

	// mediaRecorder.onstop = async () => {
	// 	const dataIsNotEmpty = chunks[0]["size"] !== 0;

	// 	if (dataIsNotEmpty) {
	// 		const date = new Date();
	// 		let clipName = prompt(
	// 			"Enter a name for your tune 🐏",
	// 			"rec on " + date.toLocaleString()
	// 		);
	// 		blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
	// 		const audioUrl = URL.createObjectURL(blob);
	// 		dispatch(
	// 			stopRecording({ audioUrl, clipName, isPlaying: false, timeline: 0 })
	// 		);
	// 	} else {
	// 		dispatch(abortRecording());
	// 	}
	// };
	mediaRecorder.onstop = async () => {
		const dataIsNotEmpty = chunks[0]["size"] !== 0;

		if (dataIsNotEmpty) {
			const date = new Date();
			let clipName = prompt(
				"Enter a name for your tune 🐏",
				"rec on " + date.toLocaleString()
			);
			const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
			const arrayBuffer = await blob.arrayBuffer();
			const audioBuffer = await actx.decodeAudioData(arrayBuffer);

			const audioUrl = audioBufferToWav(audioBuffer);

			dispatch(
				stopRecording({ audioUrl, clipName, isPlaying: false, timeline: 0 })
			);
		} else {
			dispatch(abortRecording());
		}
	};
};

export const stopRecordingAsync = () => async (dispatch) => {
	mediaRecorder.stop();
};
