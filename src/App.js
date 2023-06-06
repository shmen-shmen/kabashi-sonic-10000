import "./App.scss";
import Osc1 from "./componets/Osc1";
import Filter from "./componets/Filter";
import Keyboard from "./componets/Keyboard";
import Envelope from "./componets/Envelope";
import Delay from "./componets/Delay";
import { useSelector } from "react-redux";

function App() {
	const { canSee } = useSelector((state) => state.sliders);
	return (
		<div
			className="App"
			id="app"
			// style={canSee ? { color: "white" } : { color: "black" }}
		>
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
