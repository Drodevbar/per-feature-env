import { winstonLogger } from "../../shared/logger";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const handle = async (): Promise<void> => {
    const { PK, SK, DDB_TABLE_NAME } = process.env;

    if (!PK || !SK || !DDB_TABLE_NAME) {
        winstonLogger.error('Environment variables PK, SK, or DDB_TABLE_NAME are not defined');
        return;
    }

    winstonLogger.info(`Updating DDB item with PK: ${PK} and SK: ${SK}`);

    await new DocumentClient()
        .put({
            TableName: DDB_TABLE_NAME,
            Item: {
                pk: PK,
                sk: SK,
                timestamp: new Date().toISOString(),
            },
        })
        .promise();

    winstonLogger.info(`Put item with PK: ${PK} and SK: ${SK} into DDB table ${DDB_TABLE_NAME}`);
};