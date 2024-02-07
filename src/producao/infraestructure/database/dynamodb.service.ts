import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient({
      region: process.env.AWS_DEFAULT_REGION,
      endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
    });
  }

  async getItem(tableName: string, key: DynamoDB.DocumentClient.Key): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };

    return this.dynamoDB.get(params).promise();
  }
}