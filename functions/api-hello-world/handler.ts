import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { winstonLogger } from "../../shared/logger";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const handle = async (event: APIGatewayProxyEventV2, _context: Context): Promise<APIGatewayProxyResultV2> => {
  winstonLogger.info(`Event: ${JSON.stringify(event)}`);

  const { name = "World!" } = event.queryStringParameters || {};

  const ddbResponse = await new DocumentClient()
    .get({
      TableName: process.env.DDB_TABLE_NAME!,
      Key: {
        pk: "PK_ID#1",
        sk: "SK_ID#1",
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      hello: name,
      ddbData: ddbResponse.Item || null,
    }),
  };
};
