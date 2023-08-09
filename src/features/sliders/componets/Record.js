import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	deleteRecord,
	playRecord,
	stopRecord,
	scrubRecord,
} from "../actions/actions";

function Record({ record, index }) {
	const dispatch = useDispatch();

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

	const [waitMessage, setWaitMessage] = useState(null);
	const waitForAudioToLOad = (e) => {
		setWaitMessage("wait a second, audio is loading...");
		setTimeout(() => {
			setWaitMessage(null);
		}, 1000);
	};

	const changeTimelinePosition = (e, index) => {
		let audio;

		switch (e.type) {
			case "change":
				// console.log("onchange");
				audio = document.getElementById(`audio${index}`);

				const audioHasLoaded = isFinite(audio.duration);
				if (audioHasLoaded) {
					const time = (audio.duration * e.target.value) / 100;
					audio.currentTime = time;
					audio.pause();
					dispatch(stopRecord(index));
					dispatch(scrubRecord({ index: index, timeline: e.target.value }));
				} else waitForAudioToLOad();
				break;
			case "timeupdate":
				// console.log("timeupdate");
				audio = e.target;
				if (audio.currentTime && audio.duration) {
					const percentagePosition = (100 * audio.currentTime) / audio.duration;
					dispatch(scrubRecord({ index: index, timeline: percentagePosition }));
				} else {
					return;
				}
				break;
			case "ended":
				// console.log("onended");
				dispatch(scrubRecord({ index: index, timeline: 0 }));
				break;
			default:
				break;
		}
	};

	const deleteTrackHandler = (index) => {
		dispatch(deleteRecord(index));
	};

	const { audioUrl, clipName, isPlaying, timeline } = record;

	return (
		<div className="record" key={`record-${index}-key`}>
			<p id={`clip-name-audio${index}`}>{waitMessage || clipName}</p>
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
				<button className="player-btn">
					<a href={audioUrl} download={clipName}>
						Download
					</a>
				</button>
				<button
					onClick={() => {
						deleteTrackHandler(index);
					}}
					className="player-btn"
				>
					delete
				</button>
			</div>
		</div>
	);
}

export default Record;
