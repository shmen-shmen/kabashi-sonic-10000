import { useEffect } from "react";
import { octaveDown, octaveUp } from "../slidersSlice";
import { useDispatch } from "react-redux";

const OctaveUpDown = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		window.addEventListener("keydown", handleOctavePress);
		window.addEventListener("keyup", handleOctaveRelease);
	}, []);

	const handleOctavePress = (e) => {
		switch (e.code) {
			case "ArrowUp":
				document.getElementById("octave-up").classList.add("active");
				dispatch(octaveUp());
				break;
			case "ArrowDown":
				document.getElementById("octave-down").classList.add("active");
				dispatch(octaveDown());
				break;
			default:
				break;
		}
	};
	const handleOctaveRelease = (e) => {
		switch (e.code) {
			case "ArrowUp":
				document.getElementById("octave-up").classList.remove("active");
				break;
			case "ArrowDown":
				document.getElementById("octave-down").classList.remove("active");
			default:
				break;
		}
	};

	return (
		<div className={`octave-control`}>
			<div
				id="octave-up"
				onClick={() => {
					dispatch(octaveUp());
				}}
			>
				up
			</div>
			<div
				id="octave-down"
				onClick={() => {
					dispatch(octaveDown());
				}}
			>
				down
			</div>
		</div>
	);
};

export default OctaveUpDown;
