import { Module, DynamicModule } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class DynamoDBModule {
  static forRootAsync(): DynamicModule {
    return {
      module: DynamoDBModule,
      providers: [
        {
          provide: 'DYNAMODB_OPTIONS',
          useFactory: async (configService: ConfigService) => ({
            endpoint: configService.get('AWS_DYNAMODB_ENDPOINT'),
            region: configService.get('AWS_DEFAULT_REGION'),
          }),
          inject: [ConfigService],
        },
        DynamoDBService,
      ],
      exports: [DynamoDBService],
    };
  }
}