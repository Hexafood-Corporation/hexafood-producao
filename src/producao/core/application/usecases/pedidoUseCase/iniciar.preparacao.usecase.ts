
import { Inject } from '@nestjs/common';
import { FindPedidoByExternalPedidoIdUseCase } from "./find.pedido.by.external.pedido.id.usecase";
import { Pedido } from '../../../../core/schemas/pedido.schema';
import { IPedidosRepository } from '../../../..//core/domain/repository/pedidos.repository';
import { StatusPedido } from '../../../../core/domain/enum/status-pedido.enum';

export class IniciarPreparacaoPedidoUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
      private findPedidoByIdUseCase: FindPedidoByExternalPedidoIdUseCase,
    ) {}
  
async execute(id: number): Promise<Pedido> {

    const pedido = await this.findPedidoByIdUseCase.findByExternalPedidoId(id);

    pedido.status = StatusPedido.EM_PREPARACAO;
    return this.pedidosRepository.update(id, pedido);
  }

}

