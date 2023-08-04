import { startRecording, stopRecording } from "../actions/actions";

let mediaRecorder;

export const startRecordingAsync = (streamDst) => async (dispatch) => {
	dispatch(startRecording());

	const chunks = [];

	mediaRecorder = new MediaRecorder(streamDst.stream);
	mediaRecorder.start();

	//async action
	mediaRecorder.ondataavailable = (evt) => {
		chunks.push(evt.data);
	};

	mediaRecorder.onstop = () => {
		const clipName = prompt("Enter a name for your sound clip");
		const blob = new Blob(chunks, { type: "audio/webm; codecs=opus" });
		const audioUrl = URL.createObjectURL(blob);
		dispatch(stopRecording({ audioUrl, clipName }));
	};
};

export const stopRecordingAsync = () => async (dispatch) => {
	mediaRecorder.stop();
};
