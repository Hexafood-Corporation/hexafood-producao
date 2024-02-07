import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { Pedido } from 'src/producao/core/domain/entity/pedido.entity';
import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';
import { InputPedidoDTO, PedidoDTO } from 'src/producao/core/application/usecases/pedidoUseCase/pedido.dto';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';

@Injectable()
export class PedidosRepository implements IPedidosRepository {
  private dynamoDb: DynamoDB.DocumentClient;
  private readonly tableName = 'pedidos';

  constructor() {
    this.dynamoDb =  new DynamoDB.DocumentClient({
      region: process.env.AWS_DEFAULT_REGION,
      endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
    });
  }

  async create(data: InputPedidoDTO): Promise<Pedido> {
    const params = {
      TableName: this.tableName,
      Item: data
    };

    await this.dynamoDb.put(params).promise();

    return data as Pedido;
  }

  async findAll(status?: StatusPedido): Promise<Pedido[]> {
    const params = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDb.scan(params).promise();

    return result.Items as Pedido[];
  }

  async update(id: number, pedido: Pedido) {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': pedido.status
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await this.dynamoDb.update(params).promise();
  }

  async findByStatus(status: StatusPedido) {
    const params = {
      TableName: this.tableName,
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': status
      }
    };

    const result = await this.dynamoDb.scan(params).promise();

    return result.Items as Pedido[];
  }

  async findById(id: number): Promise<Pedido> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };

    const result = await this.dynamoDb.get(params).promise();

    return result.Item as Pedido;
  }

  async findByCodigo(codigo_pedido: string): Promise<PedidoDTO> {
    const params = {
      TableName: this.tableName,
      FilterExpression: '#codigo_pedido = :codigo_pedido',
      ExpressionAttributeNames: {
        '#codigo_pedido': 'codigo_pedido'
      },
      ExpressionAttributeValues: {
        ':codigo_pedido': codigo_pedido
      }
    };

    const result = await this.dynamoDb.scan(params).promise();
    return result.Items[0] as PedidoDTO;
  }
}