import * as AWSMock from "aws-sdk-mock";
import LambdaTester from "lambda-tester";

describe("getUserGroupsLambda", () => {
  beforeAll(() => {
    process.env.USER_POOL_ID = "testId";
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    AWSMock.setSDKInstance(require("aws-sdk"));
  });

  afterEach(() => {
    AWSMock.restore("CognitoIdentityServiceProvider", "listGroups");
  });

  it("should return true when listGroups succeed", async () => {
    const lambdaParams = {
      info: {
        selectionSetList: ["GroupName"],
      },
    };

    const listGroupsResponse = {
      Groups: [
        { GroupName: "test1" },
        {
          GroupName: "test2",
        },
      ],
    };
    const expectedResponse = [{ GroupName: "test1" }, { GroupName: "test2" }];

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "listGroups",
      jest.fn().mockResolvedValue(listGroupsResponse)
    );

    const module = await import("./getUserGroupsLambda");

    await LambdaTester(module.handler)
      .event(lambdaParams)
      .expectResult((result: unknown) => {
        expect(result).toEqual(expectedResponse);
      });
  });

  it("should throw error when listGroups fail", async () => {
    const lambdaParams = {
      info: {
        selectionSetList: ["GroupName"],
      },
    };

    AWSMock.mock("CognitoIdentityServiceProvider", "listGroups", () => {
      throw new Error("problem with created user");
    });

    const module = await import("./getUserGroupsLambda");

    await LambdaTester(module.handler)
      .event(lambdaParams)
      .expectError((error: Error) => {
        expect(error.message).toEqual("problem with created user");
      });
  });
});
