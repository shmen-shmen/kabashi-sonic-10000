import React from "react";
import { changeEnvelope } from "../features/sliders/slidersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Envelope() {
	const { envelope } = useSelector((state) => state.sliders);
	const { attack, decay, sustain, release } = envelope;
	const dispatch = useDispatch();
	const envelopeHandler = (e) => {
		const { id, value } = e.target;
		dispatch(changeEnvelope({ id, value }));
	};

	return (
		<div className="controls">
			<h2>Envelope</h2>
			<label htmlFor="attack">{"attack: " + attack}</label>
			<input
				type="range"
				name="attack"
				value={attack}
				id="attack"
				max="1"
				step="0.001"
				onChange={envelopeHandler}
			/>
			<label htmlFor="decay">{"decay: " + decay}</label>
			<input
				type="range"
				name="decay"
				value={decay}
				id="decay"
				max="1"
				step="0.001"
				onChange={envelopeHandler}
			/>
			<label htmlFor="sustain">{"sustain: " + sustain}</label>
			<input
				type="range"
				name="sustain"
				value={sustain}
				id="sustain"
				max="1"
				step="0.001"
				onChange={envelopeHandler}
			/>
			<label htmlFor="release">{"release: " + release}</label>
			<input
				type="range"
				name="release"
				value={release}
				id="release"
				max="1"
				step="0.001"
				onChange={envelopeHandler}
			/>
		</div>
	);
}
