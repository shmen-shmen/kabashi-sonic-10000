import React from "react";
import { changeEnvelope, resetEnvelope } from "../slidersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Envelope() {
	const { envelope } = useSelector((state) => state.sliders);
	const { attack, peak, decay, sustain, release } = envelope;
	const dispatch = useDispatch();

	const envelopeHandler = (e) => {
		const { id, value } = e.target;
		dispatch(changeEnvelope({ id, value }));
	};

	const envelopeResetHandler = (e) => {
		const { id } = e.target;
		dispatch(resetEnvelope({ id }));
	};

	return (
		<div className="controls">
			<h2>Envelope</h2>
			<div className="control-el">
				<label htmlFor="attack">{"attack: " + attack}</label>
				<input
					type="range"
					name="attack"
					value={attack}
					id="attack"
					max="1"
					step="0.005"
					onChange={envelopeHandler}
					onDoubleClick={envelopeResetHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="peak">{"peak: " + peak}</label>
				<input
					type="range"
					name="peak"
					value={peak}
					id="peak"
					max="0.9"
					step="0.005"
					onChange={envelopeHandler}
					onDoubleClick={envelopeResetHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="decay">{"decay: " + decay}</label>
				<input
					type="range"
					name="decay"
					value={decay}
					id="decay"
					max="1"
					step="0.01"
					onChange={envelopeHandler}
					onDoubleClick={envelopeResetHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="sustain">{"sustain: " + sustain}</label>
				<input
					type="range"
					name="sustain"
					value={sustain}
					id="sustain"
					max="0.9"
					step="0.01"
					onChange={envelopeHandler}
					onDoubleClick={envelopeResetHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="release">{"release: " + release}</label>
				<input
					type="range"
					name="release"
					value={release}
					id="release"
					max="2"
					step="0.001"
					onChange={envelopeHandler}
					onDoubleClick={envelopeResetHandler}
				/>
			</div>
		</div>
	);
}
