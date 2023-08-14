import React from "react";

function SynthHeader() {
	return (
		<header id="header">
			<h1>kabashi sonic 10000</h1>
			<button
				onClick={() => {
					document.getElementById("share-dialog").showModal();
				}}
			>
				share this app
			</button>
		</header>
	);
}

export default SynthHeader;
