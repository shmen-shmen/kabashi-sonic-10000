import React from "react";

function AboutDialog() {
	const hideDialog = () => {
		document.getElementById("about-dialog").close();
	};

	return (
		<dialog id="about-dialog" onClick={hideDialog}>
			<div className="dialog-contents">
				<form method="dialog">
					<p>
						Hello cyber-wanderer. Use this website to play music. If you like
						what you hear, you can make a record of your tune and listen to it
						later.
						<br />
						You can check out my stuff or contact me on{" "}
						<a href="https://twitter.com/shmen_shmen" target="-blank">
							twitter
						</a>
						&nbsp;
						<a href="https://www.instagram.com/betpak_dala/" target="-blank">
							instagram
						</a>
						&nbsp;
						<a href="https://github.com/shmen-shmen" target="-blank">
							github
						</a>
						&nbsp;
						<a href="mailto: nikolla-kabashi@proton.me" target="-blank">
							e-mail
						</a>
						.
						<br />
						<br />
						– shmen🐏
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<span className="copyright">
							copyright KABASHI TECHNOLOGIES 2023
						</span>
					</p>
				</form>
			</div>
		</dialog>
	);
}

export default AboutDialog;
