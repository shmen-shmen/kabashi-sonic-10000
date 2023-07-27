import "./App.scss";
import Osc1 from "./features/sliders/componets/Osc1";
import Filter from "./features/sliders/componets/Filter";
import Keyboard from "./features/sliders/componets/Keyboard";
import Envelope from "./features/sliders/componets/Envelope";
import Delay from "./features/sliders/componets/Delay";

function App() {
	return (
		<div className="App" id="app">
			<h1>kabashi sonic 10000</h1>
			<div className="synth">
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
