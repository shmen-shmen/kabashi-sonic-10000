import "./App.scss";
import Osc1 from "./componets/Osc1";
import Filter from "./componets/Filter";
import Keyboard from "./componets/Keyboard";
import Envelope from "./componets/Envelope";
import Delay from "./componets/Delay";

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
