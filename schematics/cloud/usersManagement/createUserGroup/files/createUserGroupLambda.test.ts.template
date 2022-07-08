import * as AWSMock from "aws-sdk-mock";
import LambdaTester from "lambda-tester";

describe("createGroupLambda", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    AWSMock.setSDKInstance(require("aws-sdk"));
    process.env.USER_POOL_ID = "eu-west-1-fdsf";
  });

  afterEach(() => {
    AWSMock.restore("CognitoIdentityServiceProvider", "createGroup");
  });

  it("should return true when createGroup succeed", async () => {
    const lambdaParams = {
      arguments: {
        group: {
          groupName: "TestGroup",
        },
      },
    };

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "createGroup",
      jest.fn().mockResolvedValue(true)
    );

    const module = await import("./createUserGroupLambda");

    await LambdaTester(module.handler)
      .event(lambdaParams)
      .expectResult((result: unknown) => {
        expect(result).toBeTruthy();
      });
  });

  it("should throw error when createGroup fail", async () => {
    const lambdaParams = {
      arguments: {
        group: {
          groupName: "TestGroup",
        },
      },
    };

    AWSMock.mock("CognitoIdentityServiceProvider", "createGroup", () => {
      throw new Error("problem with created user");
    });

    const module = await import("./createUserGroupLambda");

    await LambdaTester(module.handler)
      .event(lambdaParams)
      .expectError((error: Error) => {
        expect(error.message).toEqual("problem with created user");
      });
  });
});
