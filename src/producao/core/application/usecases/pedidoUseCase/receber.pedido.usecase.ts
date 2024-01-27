import { Inject } from "@nestjs/common";
import { IPedidosRepository } from "src/producao/core/domain/repository/pedidos.repository";
import { PedidoDTO } from "./pedido.dto";
import { IPedido } from "src/producao/core/schemas/pedido.schema";
import { StatusPedido } from "src/producao/core/domain/enum/status-pedido.enum";


export class ReceberPedidoUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private pedidosRepository: IPedidosRepository,
  ) {}

  async execute(pedidoInput: PedidoDTO): Promise<IPedido> {
    
    const pedidoCriado = await this.pedidosRepository.create({
      ...pedidoInput,
      status: StatusPedido.RECEBIDO,
    })
    return pedidoCriado;
  }
}