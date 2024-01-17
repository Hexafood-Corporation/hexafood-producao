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
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoSchema } from './core/schemas/pedido.schema';
import { ItemSchema } from './core/schemas/item.schema';
import { ProdutoSchema } from './core/schemas/produto.schema';
import { CategoriaSchema } from './core/schemas/categoria.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Pedido',
        schema: PedidoSchema,
      },
      {
        name: 'Item',
        schema: ItemSchema,
      },
      {
        name: 'Produto',
        schema: ProdutoSchema,
      },
      {
        name: 'Categoria',
        schema: CategoriaSchema,
      }
    ])
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
