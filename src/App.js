import "./App.scss";
import Dialog from "./features/sliders/componets/Dialog";
import Osc1 from "./features/sliders/componets/Osc1";
import Filter from "./features/sliders/componets/Filter";
import Keyboard from "./features/sliders/componets/Keyboard";
import Envelope from "./features/sliders/componets/Envelope";
import Delay from "./features/sliders/componets/Delay";
import Recorder from "./features/sliders/componets/Recorder";

function App() {
	return (
		<main className="App" id="app">
			<div className="synth">
				<Dialog />
				<header id="header">
					<h1>kabashi sonic 10000</h1>
				</header>
				<section className="modules">
					<Osc1></Osc1>
					<Envelope></Envelope>
					<Filter></Filter>
					<Delay></Delay>
				</section>
				<Keyboard></Keyboard>
				<Recorder></Recorder>
			</div>
		</main>
	);
}

export default App;
