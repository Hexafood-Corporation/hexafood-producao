
import { Inject } from '@nestjs/common';
import { FindPedidoById } from "./find.pedido.by..id.usecase";
import { IPedido } from '../../../../core/schemas/pedido.schema';
import { IPedidosRepository } from '../../../..//core/domain/repository/pedidos.repository';
import { StatusPedido } from '../../../../core/domain/enum/status-pedido.enum';

export class IniciarPreparacaoPedidoUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
      private findPedidoByIdUseCase: FindPedidoById,
    ) {}
  
async execute(id: number): Promise<IPedido> {

    const pedido = await this.findPedidoByIdUseCase.findById(id);

    pedido.status = StatusPedido.EM_PREPARACAO;
    return this.pedidosRepository.update(id, pedido);
  }

}

