import {
  Controller,
  Get,
  Patch,
  Param,
  Post,
} from '@nestjs/common';

import { IniciarPreparacaoPedidoUseCase } from '../../core/application/usecases/pedidoUseCase/iniciar.preparacao.usecase';
import { FinalizarPreparacaoPedidoUseCase } from '../../core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('producao')
@Controller('producao')
export class ProducaoController {
  constructor(
    private readonly iniciarPreparacaoPedidoUseCase: IniciarPreparacaoPedidoUseCase,
    private readonly finalizarPreparacaoPedidoUseCase: FinalizarPreparacaoPedidoUseCase,
  ) {}

  @Get()
  async findAll() {
    return 'Pedido iniciado';
  }

  @Patch(':id/iniciar_preparacao')
  async iniciarPreparacaoPedido(@Param('id') id: number) {

    return this.iniciarPreparacaoPedidoUseCase.execute(Number(id));
  }

  @Patch(':id/finalizar_preparacao')
  async finalizarPreparacaoPedido(@Param('id') id: number) {

    return this.finalizarPreparacaoPedidoUseCase.execute(Number(id));
  }
}
