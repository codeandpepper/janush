import React from "react";
import clsx from "clsx";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Technology Stack",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
      </>
    ),
  },
  {
    title: "Architecture",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
      </>
    ),
  },

  {
    title: "Infrastructure as Code",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
      </>
    ),
  },
  {
    title: "Testing",
    description: (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aperiam eius fuga
        repudiandae, quibusdam facilis exercitationem.
      </>
    ),
  },
  {
    title: "Incremental",
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
