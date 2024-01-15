import { ApiProperty } from '@nestjs/swagger';
import { CreateItemDTO } from './item.dto';
import { StatusPedido } from '../../../../core/domain/enum/status-pedido.enum';

export class InputPedidoDTO {
  external_pedido_id?: number;
  @ApiProperty()
  external_id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];
  @ApiProperty()
  status: StatusPedido;
}

export class OutputPedidoDTO {
  @ApiProperty()
  external_pedido_id?: number;
  @ApiProperty()
  external_id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];
}


export class PedidoDTO {
  @ApiProperty()
  external_pedido_id?: number;
  @ApiProperty()
  external_id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];

}