import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDelay, changeDelay } from "../features/sliders/slidersSlice";

export default function DelayControls() {
	const { delaySettings } = useSelector((state) => state.sliders);
	const { isOn, dryWet, delayTime } = delaySettings;
	const dispatch = useDispatch();
	const delayHandler = (e) => {
		const { id, value } = e.target;
		dispatch(changeDelay({ id, value }));
	};
	return (
		<div className="controls">
			<h2>Echo Delay</h2>
			<label htmlFor="dryWet">{"wet gain: " + dryWet}</label>
			<input
				type="range"
				name="dryWet"
				value={dryWet}
				id="dryWet"
				min="0"
				max="1"
				step="0.1"
				onChange={delayHandler}
				// onDoubleClick={detuneReset}
			/>
			<label htmlFor="delayTime">{"delay time: " + delayTime}</label>
			<input
				type="range"
				name="delayTime"
				value={delayTime}
				id="delayTime"
				min="0"
				max="1"
				step="0.1"
				onChange={delayHandler}
				// onDoubleClick={detuneReset}
			/>
			<button
				className={`delay delay-${isOn}`}
				onClick={() => {
					dispatch(toggleDelay());
				}}
			>
				delay
			</button>
		</div>
	);
}
