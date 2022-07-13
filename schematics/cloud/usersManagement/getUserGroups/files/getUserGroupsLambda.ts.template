import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

interface GetUserGroupsEvent {
  info: {
    selectionSetList: string[];
  };
}

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REGION,
});

export const handler: Handler<
  GetUserGroupsEvent,
  AWS.CognitoIdentityServiceProvider.GroupListType | void
> = async (event, context, callback) => {
  const GroupsParams: AWS.CognitoIdentityServiceProvider.ListGroupsRequest = {
    UserPoolId: process.env.USER_POOL_ID!,
  };

  const fetchedPermissions: AWS.CognitoIdentityServiceProvider.ListGroupsResponse =
    await cognito.listGroups(GroupsParams).promise();

  return fetchedPermissions.Groups;
};
