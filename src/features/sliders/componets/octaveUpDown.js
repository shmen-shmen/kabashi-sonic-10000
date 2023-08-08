import { useEffect } from "react";
import { octaveDown, octaveUp } from "../slidersSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	startRecordingAsync,
	stopRecordingAsync,
} from "../synthModules/recorder";
import { streamDst } from "../slidersSlice";

const OctaveUpDown = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// window.addEventListener("keydown", handleRecPress);
		window.addEventListener("keydown", handleOctavePress);
		window.addEventListener("keyup", handleOctaveRelease);
	}, []);

	const { isRecording } = useSelector((state) => state.recorder);

	// const handleRecPress = (e) => {
	// 	if (e.code !== "KeyR") {
	// 		return;
	// 	}
	// 	recordSequence();
	// };

	const recordSequence = () => {
		if (isRecording) {
			dispatch(stopRecordingAsync());
		} else {
			dispatch(startRecordingAsync(streamDst));
		}
	};

	const handleOctavePress = (e) => {
		switch (e.code) {
			case "ArrowUp":
				document.getElementById("octave-up").classList.add("active");
				dispatch(octaveUp());
				break;
			case "ArrowDown":
				document.getElementById("octave-down").classList.add("active");
				dispatch(octaveDown());
				break;
			default:
				break;
		}
	};
	const handleOctaveRelease = (e) => {
		switch (e.code) {
			case "ArrowUp":
				document.getElementById("octave-up").classList.remove("active");
				break;
			case "ArrowDown":
				document.getElementById("octave-down").classList.remove("active");
			default:
				break;
		}
	};

	return (
		<div className="keyboard-controls">
			<div className={`octave-control`}>
				<button
					id="octave-up"
					className="keyboard-control-btn"
					onClick={() => {
						dispatch(octaveUp());
					}}
				>
					↑
				</button>
				<button
					id="octave-down"
					className="keyboard-control-btn"
					onClick={() => {
						dispatch(octaveDown());
					}}
				>
					↓
				</button>
			</div>
			<button
				id="rec-btn"
				onClick={recordSequence}
				className={`keyboard-control-btn ${isRecording ? "active" : ""}`}
			>
				REC
			</button>
		</div>
	);
};

export default OctaveUpDown;
