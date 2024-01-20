import { ApiProperty } from '@nestjs/swagger';
import { CreateItemDTO } from './item.dto';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';

export class InputPedidoDTO {
  id?: number;
  @ApiProperty()
  id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];
  @ApiProperty()
  status: StatusPedido;
}

export class OutputPedidoDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];
}


export class PedidoDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];

}