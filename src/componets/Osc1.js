import React from "react";
import { changeOsc1, detuneToZero } from "../features/sliders/slidersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Osc1() {
	const { osc1Settings } = useSelector((state) => state.sliders);
	const { frequency, detune, volume, types } = osc1Settings;
	const dispatch = useDispatch();
	const osc1Handler = (e) => {
		const { id, value } = e.target;
		dispatch(changeOsc1({ id, value }));
	};
	const detuneReset = () => {
		dispatch(detuneToZero());
	};

	return (
		<div className="controls">
			<h2>Oscillator</h2>
			<label htmlFor="frequency">{"frequency: " + frequency}</label>
			<input
				type="range"
				name="frequency"
				value={frequency}
				id="frequency"
				min="50"
				max="500"
				onChange={osc1Handler}
			/>
			<label htmlFor="detune">{"detune: " + detune}</label>
			<input
				type="range"
				name="detune"
				value={detune}
				id="detune"
				min="-100"
				max="100"
				onChange={osc1Handler}
				onDoubleClick={detuneReset}
			/>
			<label htmlFor="volume">{"volume: " + volume / 1000}</label>
			<input
				type="range"
				name="volume"
				value={volume}
				id="volume"
				min="1"
				max="1000"
				onChange={osc1Handler}
			/>
			<label htmlFor="type">type</label>
			<select name="type" id="type" onChange={osc1Handler}>
				{types.map((type) => {
					return (
						<option value={type} key={type + "-key"}>
							{type}
						</option>
					);
				})}
			</select>
		</div>
	);
}
