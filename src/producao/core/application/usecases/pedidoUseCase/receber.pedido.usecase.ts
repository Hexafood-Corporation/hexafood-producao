import { Inject } from "@nestjs/common";
import { IPedidosRepository } from "../../../../core/domain/repository/pedidos.repository";
import { InputPedidoDTO } from "./pedido.dto";
import { StatusPedido } from "../../../../core/domain/enum/status-pedido.enum";
import { CriarPedidoUseCase } from './criar.pedido.usecase';
import { Pedido } from "../../../../core/schemas/pedido.schema";


export class ReceberPedidoUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private criarPedidoUseCase: CriarPedidoUseCase,
  ) {}

  async execute(pedidoInput: InputPedidoDTO): Promise<Pedido> {
    const pedidoCriado = await this.criarPedidoUseCase.execute({
      ...pedidoInput,
      status: StatusPedido.RECEBIDO,
    })
    return pedidoCriado;
  }
}