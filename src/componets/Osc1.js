import React from "react";

export default function Osc1({ change, settings, detuneRelease }) {
	const { frequency, detune, volume, types } = settings;
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
				onChange={change}
			/>
			<label htmlFor="detune">{"detune: " + detune}</label>
			<input
				type="range"
				name="detune"
				value={detune}
				id="detune"
				min="-100"
				max="100"
				onChange={change}
				onMouseUp={detuneRelease}
			/>
			<label htmlFor="volume">{"volume: " + volume / 1000}</label>
			<input
				type="range"
				name="volume"
				value={volume}
				id="volume"
				min="1"
				max="1000"
				onChange={change}
			/>
			<label htmlFor="type">type</label>
			<select name="type" id="type" onChange={change}>
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
