import { useEffect, useState } from "react";
import "./App.scss";
import Osc1 from "./componets/Osc1";
import Filter from "./componets/Filter";

let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();
gain1.gain.value = 0.5;
let filter = actx.createBiquadFilter();
let masterGain = actx.createGain();
masterGain.gain.value = 0.5;

osc1.connect(gain1);
gain1.connect(filter);
filter.connect(masterGain);
masterGain.connect(out);

function App() {
	const [osc1Settings, setOsc1Settings] = useState({
		frequency: osc1.frequency.value,
		detune: osc1.detune.value,
		volume: gain1.gain.value * 1000,
		types: ["sine", "square", "sawtooth", "triangle"],
		type: osc1.type,
	});
	const [isMute, setIsMute] = useState(false);

	const changeOsc1 = (e) => {
		const { id, value } = e.target;
		setOsc1Settings({ ...osc1Settings, [id]: value });
		switch (id) {
			case "volume":
				gain1.gain.exponentialRampToValueAtTime(
					value / 1000,
					actx.currentTime + 0.05
				);
				break;
			case "type":
				osc1.type = value;
				break;
			default:
				osc1[id].exponentialRampToValueAtTime(value, actx.currentTime + 0.05);
				break;
		}
	};

	const detuneReturn = (e) => {
		const { id } = e.target;
		setTimeout(() => {
			setOsc1Settings({ ...osc1Settings, [id]: 0 });
		}, 100);
		osc1.detune.linearRampToValueAtTime(0, actx.currentTime + 0.1);
	};

	useEffect(() => {
		if (isMute) {
			masterGain.gain.exponentialRampToValueAtTime(
				0.0001,
				actx.currentTime + 0.05
			);
		} else {
			masterGain.gain.exponentialRampToValueAtTime(
				0.5,
				actx.currentTime + 0.05
			);
		}
	}, [isMute]);

	const [filterSettings, setFilterSettings] = useState({
		frequency: filter.frequency.value,
		detune: filter.detune.value,
		Q: filter.Q.value,
		gain: filter.gain.value,
		types: [
			"lowpass",
			"highpass",
			"bandpass",
			"lowshelf",
			"highshelf",
			"peaking",
			"notch",
			"allpass",
		],
		type: filter.type,
	});

	const changeFilter = (e) => {
		const { id, value } = e.target;
		setFilterSettings({ ...filterSettings, [id]: value });
		switch (id) {
			case "gain":
				filter.gain.exponentialRampToValueAtTime(
					value / 1000,
					actx.currentTime + 0.05
				);
				break;
			case "type":
				filter.type = value;
				break;
			default:
				filter[id].exponentialRampToValueAtTime(value, actx.currentTime + 0.05);
				break;
		}
		console.log(filter);
	};

	return (
		<div className="App">
			<h1>PENIS</h1>
			<button onClick={() => osc1.start()}>start sound</button>
			<button
				onClick={() => {
					setIsMute(!isMute);
				}}
			>
				{isMute ? "unmute" : "mute"}
			</button>
			<div className="modules">
				<Osc1
					change={changeOsc1}
					settings={osc1Settings}
					detuneRelease={detuneReturn}
				></Osc1>
				<Filter change={changeFilter} settings={filterSettings}></Filter>
			</div>
		</div>
	);
}

export default App;
