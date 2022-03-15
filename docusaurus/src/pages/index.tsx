import React from "react";

import Layout from "@theme/Layout";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Authentication from "../components/Authentication";
import Architecture from "../components/Architecture";
import Features from "../components/Features";
import Hero from "../components/Hero";

export default function Home(): React.VFC {
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
