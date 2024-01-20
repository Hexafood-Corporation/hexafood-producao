import {  Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ValidationFilter } from './infraestructure/filter/validation.filter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IPedidosRepository } from './core/domain/repository/pedidos.repository';
import { ProducaoController } from './infraestructure/controller/producao.controller';
import { PedidosRepository } from './infraestructure/gateway/pedidos.repository';
import { FinalizarPreparacaoPedidoUseCase } from './core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { FindPedidoById } from './core/application/usecases/pedidoUseCase/find.pedido.by..id.usecase';
import { IniciarPreparacaoPedidoUseCase } from './core/application/usecases/pedidoUseCase/iniciar.preparacao.usecase';
import { CriarPedidoUseCase } from './core/application/usecases/pedidoUseCase/criar.pedido.usecase';
import { DynamoDBModule } from './infraestructure/database/dynamodb.module';
@Module({
  imports: [
    DynamoDBModule
  ],
  controllers: [ ProducaoController],
  providers: [
    { provide: IPedidosRepository, useClass: PedidosRepository },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
    FinalizarPreparacaoPedidoUseCase,
    FindPedidoById,
    IniciarPreparacaoPedidoUseCase,
    CriarPedidoUseCase,
  ],
  exports: [FindPedidoById, IPedidosRepository],
})
export class ProducaoModule {}
