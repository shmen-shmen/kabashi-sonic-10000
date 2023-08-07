import { useDispatch, useSelector } from "react-redux";
import {
	startRecordingAsync,
	stopRecordingAsync,
} from "../synthModules/recorder";
import { streamDst } from "../slidersSlice";
import {
	deleteRecord,
	playRecord,
	stopRecord,
	scrubRecord,
} from "../actions/actions";

const Recorder = () => {
	const dispatch = useDispatch();

	const { isRecording, records } = useSelector((state) => state.recorder);

	const recordSequence = () => {
		if (isRecording) {
			dispatch(stopRecordingAsync());
		} else dispatch(startRecordingAsync(streamDst));
	};

	const playPauseHandler = (index) => {
		const trackNumber = index;
		const audio = document.getElementById(`audio${trackNumber}`);
		if (audio.paused) {
			dispatch(playRecord(trackNumber));
			audio.play();
		} else {
			dispatch(stopRecord(trackNumber));
			audio.pause();
		}
	};

	const changeTimelinePosition = (e, index) => {
		let audio;

		switch (e.type) {
			case "change":
				audio = document.getElementById(`audio${index}`);
				const time = (audio.duration * e.target.value) / 100;
				audio.currentTime = time;
				audio.pause();
				dispatch(stopRecord(index));
				dispatch(scrubRecord({ index: index, timeline: e.target.value }));
				break;
			case "timeupdate":
				audio = e.target;
				const percentagePosition = (100 * audio.currentTime) / audio.duration;

				dispatch(scrubRecord({ index: index, timeline: percentagePosition }));
				break;
			case "ended":
				dispatch(scrubRecord({ index: index, timeline: 0 }));
				break;
			default:
				break;
		}
	};

	const deleteTrackHandler = (index) => {
		dispatch(deleteRecord(index));
	};

	return (
		<div id="recorder">
			<button onClick={recordSequence}>
				{isRecording ? "stop recording" : "start recording"}
			</button>
			<div className="records-list">
				{records.map((record, index) => {
					const { audioUrl, clipName, isPlaying, timeline } = record;
					return (
						<div className="record" key={`record-${index}-key`}>
							<p>{clipName}</p>
							<div className="audio-player">
								<audio
									controls={false}
									src={audioUrl}
									id={`audio${index}`}
									onEnded={(e) => {
										dispatch(stopRecord(index));
										changeTimelinePosition(e, index);
									}}
									onTimeUpdate={(e) => changeTimelinePosition(e, index)}
								></audio>
								<button
									onClick={() => {
										playPauseHandler(index);
									}}
									className="player-btn"
								>
									{isPlaying ? "pause" : "play"}
								</button>
								<input
									type="range"
									className="timeline"
									max="100"
									value={timeline}
									onChange={(e) => changeTimelinePosition(e, index)}
								></input>
								<button
									onClick={() => {
										deleteTrackHandler(index);
									}}
									className="player-btn"
								>
									delete
								</button>
								<button className="player-btn">
									<a href={audioUrl} download={clipName}>
										Download
									</a>
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Recorder;
