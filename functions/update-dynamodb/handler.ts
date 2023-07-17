import { winstonLogger } from "../../shared/logger";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const handle = async (): Promise<void> => {
  winstonLogger.info(`Updating DDB item with PK: ${process.env.PK!} and SK: ${process.env.SK!}`);

  await new DocumentClient()
    .put({
      TableName: process.env.DDB_TABLE_NAME!,
      Item: {
        pk: process.env.PK!,
        sk: process.env.SK!,
        timestamp: new Date().toISOString(),
      },
    })
    .promise();

  winstonLogger.info(`Put item with PK: ${process.env.PK!} and SK: ${process.env.SK!} into DDB table ${process.env.DDB_TABLE_NAME!}`);
};