import mongoose, { Document, Schema } from 'mongoose';
import { StatusPedido } from '../domain/enum/status-pedido.enum';
import { Item } from '../domain/entity/pedido.entity';
import { ItemSchema } from './item.schema';

interface IPedido extends Document {
  external_pedido_id: string;
  codigo_pedido: string;
  valor_total: number;
  status: StatusPedido;
  createdAt?: Date;
  updatedAt?: Date;
  id_cliente?: number;
  itens: Item[];
}

export const PedidoSchema: Schema = new Schema({
  external_pedido_id: { type: String, required: true },
  codigo_pedido: { type: String, required: true },
  valor_total: { type: Number, required: true },
  status: { type: String, enum: Object.values(StatusPedido), required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  id_cliente: { type: Number },
  itens: { type: [ItemSchema], default: [] },
});

function generateRandomCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return result;
}

PedidoSchema.pre('save', function (next) {
  if (!this.codigo_pedido) {
    this.codigo_pedido = generateRandomCode();
  }
  if (!this.status) {
    this.status = StatusPedido.INICIADO;
  }
  next();
});

const Pedido = mongoose.model<IPedido>('Pedido', PedidoSchema);

export { Pedido, IPedido };