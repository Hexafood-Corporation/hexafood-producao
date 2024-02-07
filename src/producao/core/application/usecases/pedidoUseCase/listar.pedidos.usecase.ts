import { Inject } from "@nestjs/common";
import { Pedido } from "src/producao/core/domain/entity/pedido.entity";
import { IPedidosRepository } from "src/producao/core/domain/repository/pedidos.repository";

export class ListarPedidosUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private pedidosRepository: IPedidosRepository,
  ) {}

  async listarPedidos(): Promise<Pedido[]> {
    return await this.pedidosRepository.findAll();
  }
}