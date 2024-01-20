import { connect, disconnect } from 'mongoose';
import { StatusPedido } from '../producao/core/domain/enum/status-pedido.enum';
import {IPedido, Pedido} from '../producao/core/schemas/pedido.schema';
import { MONGO_URI } from '../config/env';

async function seedPedidos() {
  const pedidos: Partial<IPedido>[] = [
    {
      external_pedido_id: '1',
      codigo_pedido: 'COD1',
      valor_total: 100,
      status: StatusPedido.INICIADO,
    },
    {
      external_pedido_id: '2',
      codigo_pedido: 'COD2',
      valor_total: 200,
      status: StatusPedido.INICIADO,
    },
    {
      external_pedido_id: '3',
      codigo_pedido: 'COD3',
      valor_total: 300,
      status: StatusPedido.INICIADO,
    },
    {
      external_pedido_id: '4',
      codigo_pedido: 'COD4',
      valor_total: 400,
      status: StatusPedido.INICIADO,
    },
    {
      external_pedido_id: '5',
      codigo_pedido: 'COD5',
      valor_total: 500,
      status: StatusPedido.INICIADO,
    },
    {
      external_pedido_id: '6',
      codigo_pedido: 'COD6',
      valor_total: 600,
      status: StatusPedido.INICIADO,
    },
  ];

  for (const pedido of pedidos) {
    await new Pedido(pedido).save();
  }
}

connect('mongodb://localhost:27017/hexafood')
  .then(() => seedPedidos())
  .then(() => disconnect())
  .catch(error => console.error('Erro ao executar seeds:', error));