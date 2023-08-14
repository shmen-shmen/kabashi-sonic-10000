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
						subject={`New device by KABASHI TECHNOLOGIES uses electronics to make SOUND`}
					/>
					<TwitterShareButton
						resetButtonStyle={false}
						children={"twitter"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
						title={`New device by KABASHI TECHNOLOGIES uses electronics to make SOUND `}
					/>
					<LinkedinShareButton
						resetButtonStyle={false}
						children={"linkedIn"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
						summary={`New device by KABASHI TECHNOLOGIES uses electronics to make SOUND`}
					/>
					<TelegramShareButton
						resetButtonStyle={false}
						children={"telegram"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
						title={`New device by KABASHI TECHNOLOGIES uses electronics to make SOUND`}
					/>
					<RedditShareButton
						resetButtonStyle={false}
						children={"reddit"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
						title={`New device by KABASHI TECHNOLOGIES uses electronics to make SOUND`}
					/>
					<FacebookShareButton
						resetButtonStyle={false}
						children={"facebook"}
						url="https://shmen-shmen.github.io/kabashi-sonic-10000/"
						quote={`New device by KABASHI TECHNOLOGIES uses electronics to make SOUND`}
					/>
				</form>
			</div>
		</dialog>
	);
}

export default ShareDialog;
