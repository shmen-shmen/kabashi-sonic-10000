import React from "react";

function SynthHeader() {
	return (
		<header id="header">
			<h1>kabashi sonic 10000</h1>
			<div id="header-menu">
				<button
					onClick={() => {
						document.getElementById("about-dialog").showModal();
					}}
				>
					ABOUT
				</button>
				<button
					onClick={() => {
						document.getElementById("share-dialog").showModal();
					}}
				>
					SHARE
				</button>
			</div>
		</header>
	);
}

export default SynthHeader;
