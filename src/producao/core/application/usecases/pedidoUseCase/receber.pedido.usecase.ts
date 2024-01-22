import { Inject } from "@nestjs/common";
import { IPedidosRepository } from "src/producao/core/domain/repository/pedidos.repository";
import { CriarPedidoUseCase } from "./criar.pedido.usecase";
import { InputPedidoDTO } from "./pedido.dto";
import { IPedido } from "src/producao/core/schemas/pedido.schema";
import { StatusPedido } from "src/producao/core/domain/enum/status-pedido.enum";


export class ReceberPedidoUseCase {
  constructor(
    @Inject(IPedidosRepository)
    private criarPedidoUseCase: CriarPedidoUseCase,
  ) {}

  async execute(pedidoInput: InputPedidoDTO): Promise<IPedido> {
    
    const pedidoCriado = await this.criarPedidoUseCase.execute({
      ...pedidoInput,
      status: StatusPedido.RECEBIDO,
    })
    return pedidoCriado;
  }
}