import React from "react";

import Link from "@docusaurus/Link";

export const Architecture: React.VFC = () => {
	return (
		<section className="container padding-vert--xl text--left descriptions">
			<div className="row">
				<div className="col col--6">
					<img alt="architecture" src="/img/architecture.svg" />
				</div>
				<div className="col col--5 col--offset-1">
					<h2>Architecture</h2>
					<p>
						Modern <strong>cloud-native</strong>, <strong>event-driven</strong>,{" "}
						<strong>microservices</strong> architecture. Build using{" "}
						<strong>AWS</strong> (Amazon Web Services) cloud with{" "}
						<strong>serverless</strong> approach. Cloud infrastructure defined
						using <strong>TypeScript</strong> and <strong>AWS CDK</strong>{" "}
						(Cloud Development Kit). Design principles and architectural best
						practices defined by <strong>AWS Well-Architected</strong>.
					</p>
				</div>
			</div>
		</section>
	);
};
