import React from "react";

function Dialog() {
	return (
		<dialog open id="rotateDeviceDialog">
			<div className="dialog-contents">
				<p>
					Dear User, would you kindly rotate 🤸‍♀️ your phone so that everything
					fits
				</p>
				<form method="dialog">
					<button>ok</button>
				</form>
			</div>
		</dialog>
	);
}

export default Dialog;
