import { useSelector } from "react-redux";

import Record from "./Record";

const Recorder = () => {
	const { records } = useSelector((state) => state.recorder);

	return (
		<article id="recorder">
			<h2 id="recorder-header">my tunes:</h2>
			<div className="records-list">
				{records.map((record, index) => {
					return <Record record={record} index={index} />;
				})}
			</div>
		</article>
	);
};

export default Recorder;
