import { Inject } from "@nestjs/common";
import { IPedidosRepository } from "../../../../core/domain/repository/pedidos.repository";
import { IPedido } from "../../../../core/schemas/pedido.schema";

import { InputPedidoDTO } from "./pedido.dto";
export class CriarPedidoUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private pedidosRepository: IPedidosRepository,
  ) {}

  async execute(inputPedido: InputPedidoDTO): Promise<IPedido> {
    return await this.pedidosRepository.create(inputPedido);
  }
}