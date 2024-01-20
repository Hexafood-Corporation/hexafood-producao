
import { Inject } from '@nestjs/common';
import { FindPedidoById } from "./find.pedido.by..id.usecase";

import { IPedido } from 'src/producao/core/schemas/pedido.schema';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';
import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';

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

