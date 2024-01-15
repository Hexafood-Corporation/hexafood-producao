import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InputCategoriaDto, OutputCategoriaDto } from 'src/producao/core/application/usecases/categoriaUseCase/categoria.dto';
import { ICategoriasRepository } from 'src/producao/core/domain/repository/categorias.repository';
import { Categoria } from 'src/producao/core/schemas/categoria.schema';

@Injectable()
export class CategoriasRepository implements ICategoriasRepository {
  constructor(@InjectModel(Categoria.name) private categoriaModel: Model<Categoria>) { }

  async create(createCategoriaDto: Categoria): Promise<any> {
    const createdPedido = new this.categoriaModel(createCategoriaDto);
    return createdPedido.save();
  }

  async findOne(id: number): Promise<OutputCategoriaDto> {
    const categoria = await this.categoriaModel.findOne({ id: id }).exec();
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
    return {
      id: categoria.id,
      nome: categoria.nome,
    };
  }

  async findAll(): Promise<OutputCategoriaDto[]> {
    const categorias = await this.categoriaModel.find().exec();
    if (!categorias) {
      throw new Error('Não há categorias cadastradas.');
    }
    return categorias.map(categoria => ({
      id: categoria.id,
      nome: categoria.nome,
    }));
  }
  
  async findByName(name: string): Promise<Categoria> {
      return this.categoriaModel.findOne({
        name: name
      }).exec();
  }

  async update(id: number, updateCategoriaDto: InputCategoriaDto): Promise<any> {
    return this.categoriaModel.findOneAndUpdate({ id: id }, updateCategoriaDto).exec();
  }

  async remove(id: number): Promise<any> {
    return this.categoriaModel.findOneAndDelete({ id: id }).exec();
  }


}