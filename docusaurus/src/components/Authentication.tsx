import React from "react";

import Link from "@docusaurus/Link";

export const Authentication: React.VFC = () => {
	return (
		<div className="container padding-vert--xl text--left descriptions">
			<div className="row">
				<div className="col col--6">
					<h2>Authentication</h2>
					<p>
						Don't reinvent the weel. We already built common web application
						features related to authentication like <strong>Sign up</strong>,{" "}
						<strong>Sign in</strong> or <strong>Verify email</strong>. Instead
						of spending{" "}
						<strong>
							<del>days or weeks</del>
						</strong>{" "}
						adding those common features on top of Create React App and AWS CDK
						(Cloud Development Kit) - do it{" "}
						<strong>in seconds by running one command</strong> and selecting
						options that you need. User inteface is build using the most popular
						React UI library - <strong>MUI (Material-UI)</strong>. We also have
						full design done in <strong>Figma</strong>.
					</p>
				</div>
				<div className="col col--5 col--offset-1">
					<img alt="authentication" src="/img/sign-up-and-in.png" />
				</div>
			</div>
		</div>
	);
};