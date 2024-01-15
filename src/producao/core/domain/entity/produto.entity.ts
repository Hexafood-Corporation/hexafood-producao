import { ProdutoException } from "../../application/exceptions/produto.exception";

export class Produto {
  id?: number;
  nome: string;
  id_categoria: number;
  valor: number;
  descricao: string;
  imagem: string;
  createdAt?: Date;
  updatedAt?: Date;

}
