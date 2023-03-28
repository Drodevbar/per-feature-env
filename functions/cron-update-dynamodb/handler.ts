import { Context, EventBridgeEvent } from "aws-lambda";
import { winstonLogger } from "../../shared/logger";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

interface EventBridgeEventDetail {
  pk: string;
  sk: string;
}

export const handle = async (
  event: EventBridgeEvent<"update-dynamodb", EventBridgeEventDetail>,
  _context: Context,
): Promise<void> => {
  winstonLogger.info(`Event: ${JSON.stringify(event)}`);

  const { pk, sk } = event.detail;

  await new DocumentClient()
    .put({
      TableName: process.env.DDB_TABLE_NAME!,
      Item: {
        pk,
        sk,
        timestamp: new Date().toISOString(),
      },
    })
    .promise();

  winstonLogger.info(`Put item with PK: ${pk} and SK: ${sk} into DDB table ${process.env.DDB_TABLE_NAME!}`);
};
