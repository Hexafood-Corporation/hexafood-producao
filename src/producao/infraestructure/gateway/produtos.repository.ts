import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InputProdutoDto } from "src/producao/core/application/usecases/produtoUseCase/produto.dto";
import { IProdutosRepository } from "src/producao/core/domain/repository/produtos.repository";
import { Produto } from "src/producao/core/schemas/produto.schema";


@Injectable()
export class ProdutosRepository implements IProdutosRepository {
  constructor(@InjectModel(Produto.name) private produtoModel: Model<Produto>) { }
  
  async createManyProdutos(data: InputProdutoDto[]) {
    return this.produtoModel.create(data);
  }

  async findAll() {
    return this.produtoModel.find().exec();
  }

  async findByIdCategoria(id_categoria: number) {
    return this.produtoModel.find({
      id_categoria: id_categoria
    }).exec();
  }

  async update(id: number, produto: Produto) {
    return this.produtoModel.findByIdAndUpdate(id, produto).exec();
  }

  async remove(id: number) {
    return this.produtoModel.findByIdAndDelete(id).exec();
  }

  async findById(id: number) {
    return this.produtoModel.findById(id).exec();
  }

  async findByIds(ids: number[]) {
    return this.produtoModel.find({
      id: { $in: ids }
    }).exec();
  }
  
}