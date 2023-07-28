import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import QwertyHancock from "qwerty-hancock";
import { makeOsc, killOsc, show } from "../slidersSlice";
import OctaveUpDown from "./octaveUpDown";

const Keyboard = () => {
	const dispatch = useDispatch();
	const { keyboardSettings } = useSelector((state) => state.sliders);
	const { octave } = keyboardSettings;

	useEffect(() => {
		const keyboard = new QwertyHancock({
			id: "keyboard",
			width: "500",
			height: "100",
			octaves: 2,
			startNote: `C${octave}`,
			// whiteKeyColour: "rgba(0, 50, 124, 0.0)",
			// blackKeyColour: "rgba(148, 230, 255, 1.0)",
			activeColour: "rgba(148, 230, 255)",
		});
		keyboard.keyDown = (note, freq) => {
			dispatch(show());
			dispatch(makeOsc({ note, freq }));
		};
		keyboard.keyUp = (note, freq) => {
			dispatch(killOsc({ note, freq }));
		};
	}, [octave]);

	return (
		<div id="keyboard">
			<OctaveUpDown />
		</div>
	);
};

export default Keyboard;
