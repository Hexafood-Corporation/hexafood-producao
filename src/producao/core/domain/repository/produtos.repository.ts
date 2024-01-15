import { InputProdutoDto } from "src/producao/core/application/usecases/produtoUseCase/produto.dto";
import { Produto } from "src/producao/core/domain/entity/produto.entity";

export const IProdutosRepository = 'IProdutosRepository';

export interface IProdutosRepository {
  createManyProdutos(data: InputProdutoDto[]);

  findAll(): Promise<Produto[]>;

  findByIdCategoria(id_categoria: number): Promise<Produto[]>;

  update(id: number, produto: InputProdutoDto);

  remove(id: number);

  findByIds(ids: number[]);

  findById(id: number);

}
