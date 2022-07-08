import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { handleError } from "../../../utils/handleError";

interface CreateUserEvent {
  arguments: {
    group: {
      groupName: string;
      description?: string;
    };
  };
}

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REGION,
});

const UserPoolId = process.env.USER_POOL_ID!;

export const handler: Handler<CreateUserEvent, boolean | void> = async (
  event,
  context,
  callback
) => {
  const { groupName, description } = event.arguments.group;

  const newUserGroupParams = {
    UserPoolId,
    GroupName: groupName,
    Description: description,
  };

  try {
    await cognito.createGroup(newUserGroupParams).promise();
    callback(null, true);
  } catch (e) {
    handleError(e, callback);
  }
};
