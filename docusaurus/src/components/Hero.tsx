import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "../pages/index.module.css";

export default function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--dark hero-main", styles.heroBanner)}>
      <div className="container text--left">
        <div className="row">
          <div className="col col--6">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">
              Set up a modern codebase for cloud-native web app with authentication features by{" "}
              <b>running one command</b>
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Quick Start Guide
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="https://github.com/codeandpepper/janush"
              >
                <span className="hero-github-link">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="col col--6">
            {/* <img
              src="img/terminal.png"
              loading="lazy"
              width="661"
              height="348"
              className="terminal"
            /> */}
            <img
              src="img/terminal.svg"
              loading="lazy"
              width="628"
              height="447"
              className="terminal"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
