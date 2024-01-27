import {
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';
import { FinalizarPreparacaoPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { IniciarPreparacaoPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/iniciar.preparacao.usecase';
import { ListarPedidosUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/listar.pedidos.usecase';

@ApiTags('producao')
@Controller('producao')
export class ProducaoController {
  constructor(
    private readonly iniciarPreparacaoPedidoUseCase: IniciarPreparacaoPedidoUseCase,
    private readonly finalizarPreparacaoPedidoUseCase: FinalizarPreparacaoPedidoUseCase,
    private readonly listarPedidosUseCase: ListarPedidosUseCase,
  ) {}

  @Get('/')
  async findAll() {
    return this.listarPedidosUseCase.listarPedidos();
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
