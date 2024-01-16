import mongoose, { Document, Schema } from 'mongoose';
import { Produto } from '../domain/entity/produto.entity';

interface IItem extends Document {
  id?: number;
  quantidade: number;
  valor: number;
  id_produto: number;
  produto?: Produto;
}

const ItemSchema: Schema = new Schema({
  id: { type: Number },
  quantidade: { type: Number, required: true },
  valor: { type: Number, required: true },
  id_produto: { type: Number, required: true },
  produto: { type: Schema.Types.ObjectId, ref: 'Produto' },
});

export { IItem, ItemSchema };