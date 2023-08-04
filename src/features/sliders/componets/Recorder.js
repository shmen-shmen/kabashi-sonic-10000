import { useDispatch, useSelector } from "react-redux";
import {
	startRecordingAsync,
	stopRecordingAsync,
} from "../synthModules/recorder";
import { streamDst } from "../slidersSlice";
import { deleteRecord } from "../actions/actions";

const Recorder = () => {
	const { isRecording, records } = useSelector((state) => state.recorder);

	const dispatch = useDispatch();

	const recordSequence = () => {
		if (isRecording) {
			dispatch(stopRecordingAsync());
		} else dispatch(startRecordingAsync(streamDst));
	};

	return (
		<div id="recorder">
			<button onClick={recordSequence}>
				{isRecording ? "stop recording" : "start recording"}
			</button>
			<div className="records-list">
				{records.map((record, index) => {
					const { audioUrl, clipName } = record;
					return (
						<div className="record" key={`record-${index}-key`}>
							<p>{clipName}</p>
							<audio controls src={audioUrl}></audio>
							<button
								data-index={index}
								onClick={() => dispatch(deleteRecord(index))}
							>
								delete
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Recorder;
