import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusPedido } from '../domain/enum/status-pedido.enum';

export type PedidoDocument = HydratedDocument<Pedido>;

@Schema()
export class Item {
  @Prop({ required: true })
  quantidade: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema()
export class Pedido {
  @Prop({required: true})
  external_pedido_id?: string;

  @Prop({ required: true })
  codigo_pedido: string;

  @Prop({ required: true })
  valor_total: number;

  @Prop({ required: true, enum: StatusPedido })
  status: StatusPedido;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  id_cliente?: number;

  @Prop({ type: [ItemSchema], default: [] })
  itens: Item[];

  constructor() {
    this.codigo_pedido = this.generateRandomCode();
    this.status = StatusPedido.INICIADO;
  }

  //Gera um código randômico de 6 dígitos
  private generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);