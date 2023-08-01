import React, { useEffect, useState } from "react";
import { changeOsc1, resetOsc1, changeMasterGain } from "../slidersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Osc1() {
	const { osc1Settings, masterGain } = useSelector((state) => state.sliders);
	const { detune, types } = osc1Settings;
	const dispatch = useDispatch();
	const osc1Handler = (e) => {
		const { id, value } = e.target;
		dispatch(changeOsc1({ id, value }));
	};
	const masterGainHandler = (e) => {
		const { value } = e.target;
		dispatch(changeMasterGain({ value }));
	};
	const resetHandler = (e) => {
		const { id } = e.target;
		dispatch(resetOsc1({ id }));
	};

	return (
		<div className="controls" id="osc-conrols">
			<h2>Oscillator</h2>
			<div className="control-el">
				<label htmlFor="type">type:</label>
				<select name="type" id="type" onChange={osc1Handler}>
					{types.map((type) => {
						return (
							<option value={type} key={type + "-osc"}>
								{type}
							</option>
						);
					})}
				</select>
			</div>
			<div className="control-el">
				<label htmlFor="detune">{"detune: " + detune}</label>
				<input
					type="range"
					name="detune"
					value={detune}
					id="detune"
					min="-100"
					max="100"
					onChange={osc1Handler}
					onDoubleClick={resetHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="output Gain">
					output gain
					<p>{masterGain}</p>
				</label>
				<input
					type="range"
					name="output Gain"
					value={masterGain}
					id="output Gain"
					min="0"
					max="1"
					step="0.1"
					onChange={masterGainHandler}
					onDoubleClick={resetHandler}
				/>
			</div>
		</div>
	);
}
