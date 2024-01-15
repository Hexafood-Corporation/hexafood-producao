import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriaDocument = Document & Categoria;

@Schema()
export class Categoria {
  @Prop()
  id?: number;

  @Prop({ required: true })
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
    this.validate();
  }

  validate() {
    if (!this.nome || this.nome.trim() === '') {
      throw new Error('O nome não pode ser vazio');
    }
  }
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);