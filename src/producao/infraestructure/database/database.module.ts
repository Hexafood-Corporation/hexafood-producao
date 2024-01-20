import { Module } from '@nestjs/common';
import { DynamoDBModule } from './dynamodb.module';

@Module({
  imports: [
    DynamoDBModule,
  ],
})
export class DatabaseModule { }