import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--dark hero-main", styles.heroBanner)}>
      <div className="container text--left">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <div className="row">
          <div className="col col--6">
            <p className="hero__subtitle">
              Set up a modern codebase for cloud-native web app with authentication features by{" "}
              <b>running one command</b>
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/getting-started"
              >
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
            <img
              src="img/terminal.png"
              loading="lazy"
              width="661"
              height="348"
              className="terminal"
            />
            {/* <img
              src="img/terminal.svg"
              loading="lazy"
              width="628"
              height="447"
              className="terminal"
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container padding-vert--xl text--left descriptions">
          <div className="row">
            <div className="col col--6">
              <h2>Sign in & up</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi hic aut quis vel
                asperiores cupiditate expedita mollitia ipsum optio sed. Earum tempora quidem eum
                magnam quod quasi iusto quis obcaecati? Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Voluptatum, illo, voluptatem voluptate quia, ratione recusandae
                earum dignissimos reprehenderit corporis facilis eveniet. Quis hic quam accusamus
                cumque labore delectus tempora quidem! Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Expedita, accusantium recusandae dicta exercitationem porro magni
                nostrum consequuntur, officia quibusdam distinctio laborum provident obcaecati
                necessitatibus. Iste et error sit dolorum dolor. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Pariatur dolore, nostrum voluptates tempore
                necessitatibus nisi accusantium odit neque ratione similique minus suscipit sequi
                quisquam ab maxime. Culpa rerum in ducimus.
              </p>
              <div className="codeBlockContent_1u-d">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started/getting-started"
                >
                  Quick Start Guide
                </Link>
              </div>
            </div>
            <div className="col col--5 col--offset-1">
              <img className={styles.featureSvg} alt="architecture" src="/img/sign-in-and-up.png" />
            </div>
          </div>
        </div>
        <div className="container padding-vert--xl text--left descriptions">
          <div className="row">
            <div className="col col--6">
              <img className={styles.featureSvg} alt="architecture" src="/img/architecture.svg" />
            </div>
            <div className="col col--5 col--offset-1">
              <h2>App architecture</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas laudantium
                molestiae vel dolore nesciunt sequi? Suscipit mollitia sequi, quis quod magnam
                dignissimos iure natus sapiente. Iste quo sint distinctio exercitationem.
              </p>
              <div className="codeBlockContent_1u-d">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started/getting-started"
                >
                  Quick Start Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
