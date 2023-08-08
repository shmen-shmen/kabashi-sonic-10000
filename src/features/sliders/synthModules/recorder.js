import {
	startRecording,
	abortRecording,
	stopRecording,
} from "../actions/actions";

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
		const dataIsNotEmpty = chunks[0]["size"] !== 0;

		if (dataIsNotEmpty) {
			const date = new Date();
			let clipName = prompt(
				"Enter a name for your tune 🐏",
				"rec on " + date.toLocaleString()
			);
			const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
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
