import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDTO {
  @ApiProperty()
  quantidade: number;
  valor: number;
  @ApiProperty()
  external_id_produto: number;
}

export class DetailItemDTO {
  @ApiProperty()
  quantidade: number;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  external_id_produto: number;
}
