import { Inject } from "@nestjs/common";

import { InputPedidoDTO } from "./pedido.dto";
import { IPedido } from "src/producao/core/schemas/pedido.schema";
import { IPedidosRepository } from "src/producao/core/domain/repository/pedidos.repository";
export class CriarPedidoUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private pedidosRepository: IPedidosRepository,
  ) {}

  async execute(inputPedido: InputPedidoDTO): Promise<IPedido> {
    return await this.pedidosRepository.create(inputPedido);
  }
}