/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Authorization framework",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
      </>
    ),
  },
  {
    title: "Serverless architecture",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
      </>
    ),
  },
  {
    title: "Open source",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
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

export default function HomepageFeatures(): JSX.Element {
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
