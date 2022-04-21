// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
import React from "react";



import { Architecture } from "../components/Architecture";
import { Authentication } from "../components/Authentication";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";

const Home: React.VFC = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout title={siteConfig.tagline} description={siteConfig.tagline}>
			<Hero />
			<main>
				<Features />
				<Authentication />
				<Architecture />
			</main>
		</Layout>
	);
};

export default Home;