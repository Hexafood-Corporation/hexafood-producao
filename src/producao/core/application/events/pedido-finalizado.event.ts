import { Pedido } from "../../domain/entity/pedido.entity";

export class PedidoFinalizadoEvent {
  constructor(public pedido: PedidoFinalizadoDTO) { }
}


class ProdutoDTO {
  id: number;
  nome: string;
}

class ItemDTO {
  id: number;
  quantidade: number;
  valor: number;
  produto: ProdutoDTO;
}

class ClienteDTO {
  id: number;
  nome: string;
  cpf: string;
}

export class PedidoFinalizadoDTO {
  id: number;
  codigo_pedido: string;
  valor_total: number;
  status: string;
  itens: ItemDTO[];
  cliente: ClienteDTO;
}
