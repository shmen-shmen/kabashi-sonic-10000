import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../features/sliders/slidersSlice";

export default function Filter() {
	const { filterSettings } = useSelector((state) => state.sliders);
	const { frequency, detune, Q, gain, types, type } = filterSettings;

	const dispatch = useDispatch();

	const filterHandler = (e) => {
		const { id, value } = e.target;
		dispatch(changeFilter({ id, value }));
	};

	return (
		<div className="controls">
			<h2>{type + " Filter"}</h2>
			<label htmlFor="frequency">{"frequency: " + frequency}</label>
			<input
				type="range"
				name="frequency"
				value={frequency}
				id="frequency"
				min="10"
				max="10000"
				onChange={filterHandler}
			/>
			<label htmlFor="detune">{"detune: " + detune}</label>
			<input
				type="range"
				name="detune"
				value={detune}
				id="detune"
				min="0.0001"
				max="100"
				onChange={filterHandler}
			/>
			<label htmlFor="Q">{"Q: " + Q}</label>
			<input
				type="range"
				name="Q"
				value={Q}
				id="Q"
				step="0.1"
				max="10"
				// min="0.0001"
				onChange={filterHandler}
			/>
			<label htmlFor="gain">{"gain: " + gain}</label>
			<input
				type="range"
				name="gain"
				value={gain}
				id="gain"
				// min="1"
				step="0.1"
				max="10"
				onChange={filterHandler}
			/>
			<label htmlFor="type">type</label>
			<select name="type" id="type" onChange={filterHandler}>
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
