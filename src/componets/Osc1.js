import React from "react";
import { changeOsc1, detuneToZero } from "../features/sliders/slidersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Osc1() {
	const { osc1Settings } = useSelector((state) => state.sliders);
	const { detune, types } = osc1Settings;
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
			<img src="./ilusha.jpg" alt="" />
		</div>
	);
}
