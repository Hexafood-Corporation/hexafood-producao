import { Inject } from "@nestjs/common";
import { Pedido } from "../../../domain/entity/pedido.entity";
import { IPedidosRepository } from "../../../domain/repository/pedidos.repository";

export class FindPedidoByExternalPedidoIdUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private pedidosRepository: IPedidosRepository,
  ) {}

  async findByExternalPedidoId(id: number): Promise<Pedido> {
    return await this.pedidosRepository.findByExternalPedidoId(id);
  }
}