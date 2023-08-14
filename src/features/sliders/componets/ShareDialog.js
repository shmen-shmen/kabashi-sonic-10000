import React from "react";
import {
	EmailShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	RedditShareButton,
	FacebookShareButton,
} from "react-share";

function ShareDialog() {
	const hideDialog = () => {
		document.getElementById("share-dialog").close();
	};

	return (
		<dialog id="share-dialog" onClick={hideDialog}>
			<div className="dialog-contents">
				<form method="dialog">
					<EmailShareButton
						resetButtonStyle={false}
						children={"email"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					/>
					<TwitterShareButton
						resetButtonStyle={false}
						children={"twitter"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					/>
					<LinkedinShareButton
						resetButtonStyle={false}
						children={"linkedIn"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					/>
					<TelegramShareButton
						resetButtonStyle={false}
						children={"telegram"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					/>
					<RedditShareButton
						resetButtonStyle={false}
						children={"reddit"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					/>
					<FacebookShareButton
						resetButtonStyle={false}
						children={"facebook"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					/>
				</form>
			</div>
		</dialog>
	);
}

export default ShareDialog;
