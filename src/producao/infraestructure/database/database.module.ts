import { Module } from '@nestjs/common';
import { MongooseDbModule } from './mongo.module';

@Module({
  imports: [
    MongooseDbModule,
  ],
})
export class DatabaseModule { }