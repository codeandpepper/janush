import { aws_lambda_nodejs as lambda, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";

import { DEFAULT_LAMBDA_RUNTIME } from "../../../consts/index";
import { EnvName } from "../../../enums/EnvName";
import { ServicePurpose } from "../../../enums/ServicePurpose";
import { applyTagsToResource } from "../../../utils/functions";
import { EmailsS3CdkConstruct } from "./emailsS3CdkConstruct";

interface EmailsProps {
  envName: EnvName;
}

export class EmailsCdkConstruct extends Construct {
  public readonly messageLambda: lambda.NodejsFunction;
  constructor(scope: Construct, id: string, { envName }: EmailsProps) {
    super(scope, id);

    const { emailTemplatesBucket, emailTemplatesBucketDeployment } =
      new EmailsS3CdkConstruct(this, `${envName}-EmailTemplatesBucket`, {
        envName,
      });

    // Purpose: Function, which is invoked by Cognito while sending email

    this.messageLambda = new lambda.NodejsFunction(
      this,
      `${envName}-InterceptCognitoLambda`,
      {
        entry: path.join(__dirname, "./emailsLambda.ts"),
        environment: {
          EMAIL_TEMPLATES_BUCKET_NAME: emailTemplatesBucket.bucketName,
          WEB_APP_URL: process.env.WEB_APP_URL ?? "https://janush.app",
        },
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["s3:ListBucket", "s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [
              `${emailTemplatesBucket.bucketArn}`,
              `${emailTemplatesBucket.bucketArn}/*`,
            ],
          }),
        ],
        runtime: DEFAULT_LAMBDA_RUNTIME,
      }
    );

    applyTagsToResource(
      [
        emailTemplatesBucket,
        emailTemplatesBucketDeployment,
        this.messageLambda,
      ],
      {
        envName,
        purpose: ServicePurpose.Authentication,
      }
    );
  }
}
