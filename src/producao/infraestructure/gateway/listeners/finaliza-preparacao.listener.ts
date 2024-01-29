import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IQueueService } from '../../queue/queue.service';
import { FinalizarPreparacaoPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { PedidoFinalizadoEvent } from 'src/producao/core/application/events/pedido-finalizado.event';

@Injectable()
export class PedidoFinalizadoListener {
  constructor(
    private finalizaPreparacaoPedidoUseCase: FinalizarPreparacaoPedidoUseCase,
    @Inject('IQueueService')
    private queueService: IQueueService,
  ) { }

  @OnEvent('pedido.finalizado')
  async handle(event: PedidoFinalizadoEvent) {
    const pedido = event.pedido;

    const pedidoMessageDto = {
      id: pedido.id,
      codigo_pedido: pedido.codigo_pedido,
      valor_total: pedido.valor_total,
      status: pedido.status,
      itens: pedido.itens.map((item) => {
        return {
          id: item.id,
          quantidade: item.quantidade,
          valor: item.valor,
          produto: { id: item.produto.id, nome: item.produto.nome },
        };
      }),
      cliente: null,
    };

    if (pedido.cliente) {
      pedidoMessageDto.cliente = {
        id: pedido.cliente.id,
        nome: pedido.cliente.nome,
        cpf: pedido.cliente.cpf,
      };
    }

    try {
      await this.finalizaPreparacaoPedidoUseCase.execute(pedido.id);
      return this.queueService.sendMessage(
        process.env.AWS_SQS_PEDIDO_FINALIZADO_QUEUE_URL,
        JSON.stringify(pedidoMessageDto),
      )
    } catch (error) {
      console.error(error);
    }
  }
}
