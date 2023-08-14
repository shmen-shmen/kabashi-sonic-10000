import React, { useEffect, useState } from "react";
import {
	changeOsc1,
	resetOsc1,
	changeMasterGain,
	changeLfo,
	resetLfo,
} from "../slidersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Osc1() {
	const { osc1Settings, lfoSettings, masterGain } = useSelector(
		(state) => state.sliders
	);

	const { types } = osc1Settings;
	const { lfoFrequency, lfoAmplitude } = lfoSettings;
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

	const lfoHandler = (e) => {
		const { id, value } = e.target;
		dispatch(changeLfo({ id, value }));
	};

	const lfoResetHandler = (e) => {
		console.log(e.target.id);
		dispatch(resetLfo(e.target.id));
	};

	return (
		<article className="controls" id="osc-conrols">
			<h2>Oscillator</h2>
			<div className="control-el">
				<label htmlFor="waveform-type">type:</label>
				<select name="waveform-type" id="waveform-type" onChange={osc1Handler}>
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
				<label htmlFor="lfoFrequency">
					detune freq <p>{lfoFrequency}</p>
				</label>
				<input
					type="range"
					name="lfoFrequency"
					value={lfoFrequency}
					id="lfoFrequency"
					min="0"
					max="100"
					onChange={lfoHandler}
					onDoubleClick={lfoResetHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="lfoAmplitude">
					detune amp <p>{lfoAmplitude}</p>
				</label>
				<input
					type="range"
					name="lfoAmplitude"
					value={lfoAmplitude}
					id="lfoAmplitude"
					min="0"
					max="1000"
					onChange={lfoHandler}
					onDoubleClick={lfoResetHandler}
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
		</article>
	);
}
