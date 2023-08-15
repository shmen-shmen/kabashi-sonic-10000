import "./App.scss";
import RotateDialog from "./features/sliders/componets/RotateDialog";
import ShareDialog from "./features/sliders/componets/ShareDialog";
import AboutDialog from "./features/sliders/componets/AboutDialog";
import SynthHeader from "./features/sliders/componets/synthHeader";
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
				<RotateDialog />
				<ShareDialog />
				<AboutDialog />
				<SynthHeader></SynthHeader>
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
