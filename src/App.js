import { useEffect, useState } from "react";
import "./App.scss";
import Osc1 from "./componets/Osc1";
import Filter from "./componets/Filter";
import Keyboard from "./componets/Keyboard";
import Envelope from "./componets/Envelope";
import DelayControls from "./componets/delayControls";

function App() {
	return (
		<div className="App">
			<h1>PENIS</h1>
			<div className="synth">
				<div className="modules">
					<Osc1></Osc1>
					<Envelope></Envelope>
					<Filter></Filter>
					<DelayControls></DelayControls>
				</div>
				<Keyboard></Keyboard>
			</div>
		</div>
	);
}

export default App;
