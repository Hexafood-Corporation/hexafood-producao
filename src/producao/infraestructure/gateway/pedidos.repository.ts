import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido } from 'src/producao/core/domain/entity/pedido.entity';
import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';

@Injectable()
export class PedidosRepository implements IPedidosRepository {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,

  ) { }

  async create(pedido: Pedido): Promise<Pedido> {
    const createdPedido = new this.pedidoModel(pedido);
    return createdPedido.save();
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoModel.find().exec();
  }

  async update(id: number, pedido: Pedido): Promise<Pedido> {
    return this.pedidoModel.findOneAndUpdate({ id: id }, pedido).exec();
  }

  async findByStatus(status: string): Promise<Pedido[]> {
    return this.pedidoModel.find({
      status: status
    }).exec();
  }

  async findByExternalPedidoId(id: number): Promise<Pedido> {
    return this.pedidoModel.findOne({
      external_pedido_id: id
    }).exec();
  }

  async findById(id: number): Promise<Pedido> {
    return this.pedidoModel.findOne({
      id: id
    }).exec();
  }

  async findByCodigo(codigo_pedido: string): Promise<Pedido> {
    return this.pedidoModel.findOne({
      codigo_pedido: codigo_pedido
    }).exec();
  }
}