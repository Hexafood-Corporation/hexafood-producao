import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProducaoModule } from './producao/producao.module';

@Module({
  imports: [
    ProducaoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
})
export class AppModule {}
