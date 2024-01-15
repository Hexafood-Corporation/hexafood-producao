import {
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import {  OutputPedidoDTO } from 'src/producao/core/application/usecases/pedidoUseCase/pedido.dto';
import { PedidosPendentesUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/pedidos.pendentes.usecase';
import { IniciarPreparacaoPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/iniciar.preparacao.usecase';
import { FinalizarPreparacaoPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { FinalizarPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/finalizar.pedido.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('producao')
@Controller('producao')
export class ProducaoController {
  constructor(
    private readonly pedidosPendentesUseCase: PedidosPendentesUseCase,
    private readonly iniciarPreparacaoPedidoUseCase: IniciarPreparacaoPedidoUseCase,
    private readonly finalizarPreparacaoPedidoUseCase: FinalizarPreparacaoPedidoUseCase,
    private readonly finalizarPedidoUseCase: FinalizarPedidoUseCase,
  ) {}

  @Get('/consultar_pedidos_pendentes')
  async consultarPedidosPendentes(): Promise<OutputPedidoDTO[] | null> {
    return this.pedidosPendentesUseCase.execute();
  }

  @Patch(':id/iniciar_preparacao')
  async iniciarPreparacaoPedido(@Param('id') id: number) {

    return this.iniciarPreparacaoPedidoUseCase.execute(Number(id));
  }

  @Patch(':id/finalizar_preparacao')
  async finalizarPreparacaoPedido(@Param('id') id: number) {

    return this.finalizarPreparacaoPedidoUseCase.execute(Number(id));
  }

  @Patch(':id/finalizar_pedido')
  async finalizarPedido(@Param('id') id: number) {

    return this.finalizarPedidoUseCase.execute(Number(id));
  }
}
