import { Tags } from "aws-cdk-lib";
import { Construct, IConstruct } from "constructs";

import { EnvName } from "../enums/EnvName";

/**
 * Utility, which applies purpose and env tags to the resources
 * @param resources - Resources, which shall be tagged
 * @param envName   - Environment name
 * @param purpose   - Purpose of resources
 * @param tags      - Optional custom tags in [tagName, value] form
 */
export const applyTagsToResource: (
  resources: IConstruct[],
  params: {
    envName: EnvName;
    purpose: string;
  },
  tags?: [string, string][]
) => void = (resources, { envName, purpose }, tags = []) => {
  for (const resource of resources) {
    Tags.of(resource).add("ResourceEnvironment", envName);
    Tags.of(resource).add("ResourcePurpose", purpose);
    for (const tag of tags) {
      Tags.of(resource).add(tag[0], tag[1]);
    }
  }
};
