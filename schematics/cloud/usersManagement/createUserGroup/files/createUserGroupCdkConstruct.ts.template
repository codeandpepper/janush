import { Construct } from "constructs";
import { EnvName } from "@enums/EnvName";
import {
  aws_lambda_nodejs as lambda,
  aws_iam as iam,
  StackProps,
  aws_cognito as cognito,
} from "aws-cdk-lib";
import * as appSync from "@aws-cdk/aws-appsync-alpha";
import * as path from "path";
import { DEFAULT_LAMBDA_RUNTIME } from "../../../consts/index";
import { defaultPermissions } from "./defaultGroups";

interface CreateGroupProps {
  envName: EnvName;
  userPool: cognito.UserPool;
  graphQlApi: appSync.GraphqlApi;
}

export class CreateUserGroupCdkConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { envName, userPool, graphQlApi }: StackProps & CreateGroupProps
  ) {
    super(scope, id);

    const createUserGroupLambda = new lambda.NodejsFunction(
      this,
      `${envName}-CreateUserGroup`,
      {
        entry: path.join(__dirname, "./createUserGroupLambda.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["cognito-idp:CreateGroup"],
            effect: iam.Effect.ALLOW,
            resources: [userPool.userPoolArn],
          }),
        ],
        runtime: DEFAULT_LAMBDA_RUNTIME,
        environment: {
          USER_POOL_ID: userPool.userPoolId,
        },
      }
    );

    defaultPermissions.forEach((group) => {
      new cognito.CfnUserPoolGroup(this, `${envName}-${group.name}Group`, {
        userPoolId: userPool.userPoolId,
        groupName: group.name,
        description: group.description,
      });
    });

    const createGroupDataSource = graphQlApi.addLambdaDataSource(
      `${envName}-CreateGroupDataSource`,
      createUserGroupLambda
    );

    createGroupDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createUserGroup",
    });
  }
}
