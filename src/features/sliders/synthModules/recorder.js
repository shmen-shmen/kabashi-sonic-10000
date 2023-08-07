import {
	startRecording,
	abortRecording,
	stopRecording,
} from "../actions/actions";

import lamejs from "lamejs";

let mediaRecorder;

export const startRecordingAsync = (streamDst) => async (dispatch) => {
	dispatch(startRecording());

	const chunks = [];
	const mp3Encoder = new lamejs.Mp3Encoder(1, 44100, 128); // 1 channel, 44.1kHz, 128kbps

	mediaRecorder = new MediaRecorder(streamDst.stream);
	mediaRecorder.start();

	//async action
	// mediaRecorder.ondataavailable = (evt) => {
	// 	chunks.push(evt.data);
	// };
	mediaRecorder.ondataavailable = async (evt) => {
		chunks.push(new Int16Array(await evt.data.arrayBuffer()));
	};

	mediaRecorder.onstop = () => {
		if (chunks[0]["size"] !== 0) {
			const clipName = prompt("Enter a name for your sound clip");
			// const blob = new Blob(chunks, { type: "audio/wav; codecs=PCM" });
			const blob = new Blob([mp3Encoder.encodeBuffer(chunks.flat())], {
				type: "audio/mp3",
			});
			const audioUrl = URL.createObjectURL(blob);
			dispatch(stopRecording({ audioUrl, clipName, isPlaying: false }));
		} else {
			dispatch(abortRecording());
		}
	};
};

export const stopRecordingAsync = () => async (dispatch) => {
	mediaRecorder.stop();
};
