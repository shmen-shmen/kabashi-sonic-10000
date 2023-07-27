import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import QwertyHancock from "qwerty-hancock";
import { makeOsc, killOsc, show } from "../slidersSlice";

const Keyboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const keyboard = new QwertyHancock({
			id: "keyboard",
			width: "799",
			height: "100",
			octaves: 3,
			startNote: "C4",
			whiteKeyColour: "rgba(0, 50, 124, 0.0)",
			blackKeyColour: "rgba(148, 230, 255, 0.0)",
			activeColour: "rgba(255, 255, 255)",
			// activeColour: "rgba(148, 230, 255)",
		});
		keyboard.keyDown = (note, freq) => {
			dispatch(show());
			dispatch(makeOsc({ note, freq }));
		};
		keyboard.keyUp = (note, freq) => {
			dispatch(killOsc({ note, freq }));
		};
	}, []);

	return <div id="keyboard">Keyboard</div>;
};

export default Keyboard;
