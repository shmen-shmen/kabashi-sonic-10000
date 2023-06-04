import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QwertyHancock from "qwerty-hancock";
import { makeOsc, killOsc } from "../features/sliders/slidersSlice";

const Keyboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const keyboard = new QwertyHancock({
			id: "keyboard",
			width: "799",
			height: "100",
			octaves: 3,
			startNote: "C4",
		});
		keyboard.keyDown = (note, freq) => {
			dispatch(makeOsc({ note, freq }));
		};
		keyboard.keyUp = (note, freq) => {
			dispatch(killOsc({ note, freq }));
		};
	}, []);

	return <div id="keyboard">Keyboard</div>;
};

export default Keyboard;
