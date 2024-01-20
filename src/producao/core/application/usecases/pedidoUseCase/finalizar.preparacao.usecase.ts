import { Inject } from "@nestjs/common";
import { IPedidosRepository } from "src/producao/core/domain/repository/pedidos.repository";
import { FindPedidoById } from "./find.pedido.by..id.usecase";
import { StatusPedido } from "src/producao/core/domain/enum/status-pedido.enum";
import { Pedido } from "src/producao/core/domain/entity/pedido.entity";


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