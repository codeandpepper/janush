import { S3 } from "aws-sdk";

import { EmailTemplate } from "@enums/EmailTemplate";

import { generateEmailFromS3Template } from "./index";

const mockS3Instance = {
  getObject: function () {
    return {
      promise: () =>
        Promise.resolve({
          Body: "$AppName$ email verification",
        }),
    };
  },
};

jest.mock("aws-sdk", () => {
  return { S3: jest.fn(() => mockS3Instance) };
});

describe("generateEmailFromS3Template", () => {
  it("should return emailContent", async () => {
    const s3 = new S3();

    const result = await generateEmailFromS3Template(
      s3,
      EmailTemplate.EMAIL_VERIFICATION,
      [[/\$AppName\$/, "TestApp"]]
    );

    expect(result).toEqual("TestApp email verification");
  });
});
