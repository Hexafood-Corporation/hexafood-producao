import { DynamoDB } from 'aws-sdk';
import { StatusPedido } from '../producao/core/domain/enum/status-pedido.enum';
import { IPedido } from 'src/producao/core/schemas/pedido.schema';

async function seedPedidos() {
  const dynamoDB = new DynamoDB.DocumentClient({
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
  });

  const pedidos: Partial<IPedido>[] = [
    {
      id: 1,
      codigo_pedido: 'COD1',
      valor_total: 100,
      status: StatusPedido.INICIADO,
    },
    {
      id: 2,
      codigo_pedido: 'COD2',
      valor_total: 200,
      status: StatusPedido.INICIADO,
    },
    {
      id: 3,
      codigo_pedido: 'COD3',
      valor_total: 300,
      status: StatusPedido.INICIADO,
    },
    {
      id: 4,
      codigo_pedido: 'COD4',
      valor_total: 400,
      status: StatusPedido.INICIADO,
    },
    {
      id: 5,
      codigo_pedido: 'COD5',
      valor_total: 500,
      status: StatusPedido.INICIADO,
    },
    {
      id: 6,
      codigo_pedido: 'COD6',
      valor_total: 600,
      status: StatusPedido.INICIADO,
    },
  ];

  for (const pedido of pedidos) {
    await dynamoDB.put({
      TableName: 'pedidos',
      Item: pedido,
    }).promise();
  }
}


seedPedidos()
  .then(() => console.log('Seeds executados com sucesso'))
  .catch(error => console.error('Erro ao executar seeds:', error))