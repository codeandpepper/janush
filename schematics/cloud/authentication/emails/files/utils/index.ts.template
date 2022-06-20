import { S3 } from "aws-sdk";

import { EmailTemplate } from "../../../../enums/EmailTemplate";

interface Options {
  bucketName: string;
  templateName: EmailTemplate;
  reformedReplacements: [RegExp, string][];
}

/**
 * Helper function, which grabs email template and translation from S3 and supplies data to it
 * @param s3 - S3 instance for api calls
 * @param opts  - interface that contains information about name of the S3 bucket, template name in S3 bucket
 * and replacement tuples array
 */
export const generateEmailFromS3Template = async (
  s3: S3,
  opts: Options
): Promise<string> => {
  const { EMAIL_TEMPLATE_BUCKET_NAME } = process.env;

  const templateParams = {
    Bucket: opts.bucketName!,
    Key: `emailTemplates/${opts.templateName}.html`,
  };

  console.log(`Trying to grab ${opts.templateName} template`);
  const emailTemplateRaw = await s3.getObject(templateParams).promise();

  console.log("Replacing values in the template");

  let emailContent = emailTemplateRaw.Body!.toString();

  for (const [key, value] of opts.reformedReplacements) {
    emailContent = emailContent.replace(key, value);
  }

  return emailContent;
};
