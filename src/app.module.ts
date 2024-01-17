import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './producao/infraestructure/database/database.module';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProducaoModule } from './producao/producao.module';

@Module({
  imports: [
    ProducaoModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
