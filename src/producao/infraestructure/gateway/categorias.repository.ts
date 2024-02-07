import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { InputCategoriaDto, OutputCategoriaDto } from 'src/producao/core/application/usecases/categoriaUseCase/categoria.dto';
import { ICategoriasRepository } from 'src/producao/core/domain/repository/categorias.repository';
import { Categoria } from 'src/producao/core/schemas/categoria.schema';

@Injectable()
export class CategoriasRepository implements ICategoriasRepository {
  private readonly dynamoDB: DynamoDB.DocumentClient;
  constructor(dynamoDb: DynamoDB.DocumentClient) {
    this.dynamoDB = dynamoDb
  }

  async create(createCategoriaDto: Categoria): Promise<any> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'Categorias',
      Item: createCategoriaDto,
    };

    return this.dynamoDB.put(params).promise();
  }

  async findOne(id: number): Promise<OutputCategoriaDto> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: 'Categorias',
      Key: { id },
    };

    const result = await this.dynamoDB.get(params).promise();

    if (!result.Item) {
      throw new Error('Categoria não encontrada');
    }

    return {
      id: result.Item.id,
      nome: result.Item.nome,
    };
  }

  async findAll(): Promise<OutputCategoriaDto[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'Categorias',
    };

    const result = await this.dynamoDB.scan(params).promise();

    return result.Items as OutputCategoriaDto[];
  }
  
  async findByName(name: string): Promise<Categoria> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'Categorias',
      FilterExpression: 'contains(nome, :nome)',
      ExpressionAttributeValues: {
        ':nome': name,
      },
    };

    const result = await this.dynamoDB.scan(params).promise();

    if (!result.Items) {
      throw new Error('Categoria não encontrada');
    }

    return result.Items[0] as Categoria;
  }

  async update(id: number, updateCategoriaDto: InputCategoriaDto): Promise<any> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: 'Categorias',
      Key: { id },
      UpdateExpression: 'set nome = :nome',
      ExpressionAttributeValues: {
        ':nome': updateCategoriaDto.nome,
      },
    };

    return this.dynamoDB.update(params).promise();
  }

  async remove(id: number): Promise<any> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: 'Categorias',
      Key: { id },
    };

    return this.dynamoDB.delete(params).promise();
  }


}