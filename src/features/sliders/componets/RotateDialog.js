import React from "react";

function RotateDialog() {
	return (
		<dialog id="rotate-dialog" open>
			<div className="dialog-contents rotate-dialog">
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

export default RotateDialog;
