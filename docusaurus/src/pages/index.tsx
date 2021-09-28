import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Hero from "../components/Hero";
import Features from "../components/Features";
import Authentication from "../components/Authentication";
import Architecture from "../components/Architecture";

export default function Home(): JSX.Element {
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
}
