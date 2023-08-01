import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDelay } from "../slidersSlice";

export default function Delay() {
	const { delaySettings, canSee } = useSelector((state) => state.sliders);
	const { dryWet, delayTime } = delaySettings;
	const dispatch = useDispatch();
	const delayHandler = (e) => {
		const { id, value } = e.target;
		dispatch(changeDelay({ id, value }));
	};

	let [showVladika, setShowVladika] = useState(false);

	useEffect(() => {
		if (canSee && canSee <= 0.05) {
			setShowVladika(true);
			setTimeout(() => {
				setShowVladika(false);
			}, 3000);
		}
	}, [canSee]);

	return (
		<div className="controls">
			<h2>Echo Delay</h2>
			<div className="control-el">
				<label htmlFor="dryWet">{" gain: " + dryWet}</label>
				<input
					type="range"
					name="dryWet"
					value={dryWet}
					id="dryWet"
					min="0"
					max="0.9"
					step="0.1"
					onChange={delayHandler}
				/>
			</div>
			<div className="control-el">
				<label htmlFor="delayTime">{"time: " + delayTime}</label>
				<input
					type="range"
					name="delayTime"
					value={delayTime}
					id="delayTime"
					min="0"
					max="1"
					step="0.1"
					onChange={delayHandler}
				/>
			</div>
			{showVladika ? <div className="sticker shanin"></div> : null}
			{/* <img src="./shmin-small.png" alt="" className="sticker shmin" /> */}
			{/* <div className="control-el">
			i figured i don't need a switch as i have a gain slider
				<button
					className={`delay delay-${isOn}`}
					onClick={() => {
						dispatch(toggleDelay());
					}}
				>
					delay
				</button>
			</div> */}
		</div>
	);
}
