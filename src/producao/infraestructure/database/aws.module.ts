
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'AWS',
      useFactory: (configService: ConfigService) => {
        AWS.config.update({
          region: configService.get<string>('AWS_DEFAULT_REGION'),
          accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });
        return AWS;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['AWS'],
})
export class AwsModule { }