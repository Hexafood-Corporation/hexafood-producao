import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProdutoDocument = Document & Produto;

@Schema()
export class Produto {
  @Prop()
  id?: number;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  id_categoria: number;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  imagem: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);