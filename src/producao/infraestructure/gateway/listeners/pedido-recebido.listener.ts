import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PedidoRecebidoEvent } from 'src/producao/core/application/events/pedido-recebido.event';
import { PedidoDTO } from 'src/producao/core/application/usecases/pedidoUseCase/pedido.dto';
import { CreateItemDTO } from 'src/producao/core/application/usecases/pedidoUseCase/item.dto';
import { ReceberPedidoUseCase } from 'src/producao/core/application/usecases/pedidoUseCase/receber.pedido.usecase';

@Injectable()
export class PedidoRecebidoListener {
    constructor(
        private receberPedidoUseCase: ReceberPedidoUseCase,
    ) { }

    @OnEvent('pedido.recebido')
    async handle(event: PedidoRecebidoEvent) {
        const pedido = event.pedido;

        const pedidoDTO = new PedidoDTO();
        pedidoDTO.id = pedido.id;
        pedidoDTO.codigo_pedido = pedido.codigo_pedido;
        pedidoDTO.id_cliente = pedido.cliente.id;
        pedidoDTO.itens = pedido.itens.map((item) => {
            const inputItemDTO = new CreateItemDTO();
            inputItemDTO.id_produto = item.produto.id;
            inputItemDTO.quantidade = item.quantidade;
            return inputItemDTO;
        });

        return this.receberPedidoUseCase.execute(pedidoDTO);
    }
}
