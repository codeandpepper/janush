import React from "react";

import clsx from "clsx";

interface FeatureItem {
  title: string;
  description: JSX.Element;
}

const FeatureList: FeatureItem[] = [
  {
    title: "Technology Stack",
    description: (
      <>
        Modern <strong>TypeScript</strong> based technology stack with{" "}
        <strong>React</strong>, <strong>MUI</strong> on the frontend, serverless{" "}
        <strong>AWS</strong>, <strong>Node.js</strong> on the backend and{" "}
        <strong>AWS CDK</strong> for the infrastructure.
      </>
    ),
  },
  {
    title: "Architecture",
    description: (
      <>
        <strong>Coud-native</strong>, <strong>event-driven</strong>,{" "}
        <strong>microservices</strong> architecture. Build using{" "}
        <strong>AWS</strong> cloud with <strong>serverless</strong> approach.
        Design principles and architectural best practices defined by{" "}
        <strong>AWS Well-Architected</strong>.
      </>
    ),
  },

  {
    title: "Infrastructure as Code",
    description: (
      <>
        Cloud resources are defined using <strong>TypeScript</strong> thanks to{" "}
        <strong>AWS CDK (Cloud Development Kit)</strong>. Infrastructure is
        versioned and automatically provisioned.
      </>
    ),
  },
  {
    title: "Testing",
    description: (
      <>
        We create a lot of{" "}
        <strong>unit, integration and component tests</strong> using{" "}
        <strong>Jest</strong> and <strong>Testing Library</strong>. You can also
        choose from two sets of{" "}
        <strong>E2E tests - Cypress or Playwright</strong>.
      </>
    ),
  },
  {
    title: "Incremental",
    description: (
      <>
        You will be able to <strong>incrementally add new features</strong>{" "}
        thanks to template-based advanced code generator based on{" "}
        <strong>Schematics</strong>.
      </>
    ),
  },
  {
    title: "Open source",
    description: (
      <>
        Project is fully <strong>open-sourced</strong> and uses{" "}
        <strong>MIT</strong> license. We have very interesting roadmap of a new
        features, comming soon.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--left padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Features(): JSX.Element {
  return (
    <section className="hero hero--dark features">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
