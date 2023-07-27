import "./App.scss";
import Osc1 from "./features/sliders/componets/Osc1";
import Filter from "./features/sliders/componets/Filter";
import Keyboard from "./features/sliders/componets/Keyboard";
import Envelope from "./features/sliders/componets/Envelope";
import Delay from "./features/sliders/componets/Delay";
import { useEffect } from "react";

function App() {
	return (
		<div className="App" id="app">
			{/* <dialog open id="rotateDeviceDialog">
				<div className="dialog-contents">
					<p>
						Dear User, would you kindly rotate 🤸‍♀️ your phone so that everything
						fits
					</p>
					<form method="dialog">
						<button>ok</button>
					</form>
				</div>
			</dialog> */}
			<div className="synth">
				<h1>kabashi sonic 10000</h1>
				<div className="modules">
					<Osc1></Osc1>
					<Envelope></Envelope>
					<Filter></Filter>
					<Delay></Delay>
				</div>
				<Keyboard></Keyboard>
			</div>
		</div>
	);
}

export default App;
