import { Inject } from "@nestjs/common";
import { Pedido } from "../../../domain/entity/pedido.entity";
import { IPedidosRepository } from "../../../domain/repository/pedidos.repository";

export class FindPedidoById {
  constructor(
    @Inject(IPedidosRepository)
    private pedidosRepository: IPedidosRepository,
  ) {}

  async findById(id: number): Promise<Pedido> {
    return await this.pedidosRepository.findById(id);
  }
}