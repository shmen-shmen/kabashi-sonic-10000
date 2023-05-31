import { useEffect, useState } from "react";
import "./App.scss";
import Osc1 from "./componets/Osc1";
import Filter from "./componets/Filter";
import { useSelector, useDispatch } from "react-redux";
import { startOsc1, muteSwitch } from "./features/sliders/slidersSlice";

function App() {
	const { isMute } = useSelector((state) => state.sliders);

	const dispatch = useDispatch();

	return (
		<div className="App">
			<h1>PENIS</h1>
			<button
				onClick={() => {
					dispatch(startOsc1());
				}}
			>
				start sound
			</button>
			<button
				onClick={() => {
					dispatch(muteSwitch());
				}}
			>
				{isMute ? "unmute" : "mute"}
			</button>
			<div className="modules">
				<Osc1></Osc1>
				<Filter></Filter>
			</div>
		</div>
	);
}

export default App;
