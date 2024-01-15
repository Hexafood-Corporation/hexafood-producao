import { IPedidosRepository } from "../../../../core/domain/repository/pedidos.repository";
import { Inject } from '@nestjs/common';
import { Pedido } from "../../../../core/domain/entity/pedido.entity";
import { StatusPedido } from "../../../../core/domain/enum/status-pedido.enum";
import { FindPedidoById } from "./find.pedido.by..id.usecase";

export class FinalizarPreparacaoPedidoUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
      private findPedidoByIdUseCase: FindPedidoById
    ) {}
  
async execute(id: number): Promise<Pedido> {
    const pedido = await this.findPedidoByIdUseCase.findById(id);
    if(pedido.status !== StatusPedido.EM_PREPARACAO){
      throw new Error('Pedido não está em preparação');
    }
    pedido.status = StatusPedido.PRONTO;
    return await this.pedidosRepository.update(id, pedido);
  }
}