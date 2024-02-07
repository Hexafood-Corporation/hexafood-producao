import { Inject } from "@nestjs/common";
import { IPedidosRepository } from "src/producao/core/domain/repository/pedidos.repository";
import { FindPedidoById } from "./find.pedido.by..id.usecase";
import { StatusPedido } from "src/producao/core/domain/enum/status-pedido.enum";
import { Pedido } from "src/producao/core/domain/entity/pedido.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";


export class FinalizarPreparacaoPedidoUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
      private findPedidoByIdUseCase: FindPedidoById,
      private eventEmitter: EventEmitter2,
    ) {}
  
async execute(id: number): Promise<Pedido> {
    const pedido = await this.findPedidoByIdUseCase.findById(id);
    if(pedido.status !== StatusPedido.EM_PREPARACAO){
      throw new Error('Pedido não está em preparação');
    }
    pedido.status = StatusPedido.PRONTO;
  const updatedPedido = await this.pedidosRepository.update(id, pedido);

  this.eventEmitter.emit('pedido.finalizado', updatedPedido);

  return updatedPedido;
  }
}