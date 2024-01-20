import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from '../../core/schemas/categoria.schema';
import { ItemSchema } from '../../core/schemas/item.schema';
import { PedidoSchema } from '../../core/schemas/pedido.schema';
import { ProdutoSchema } from '../../core/schemas/produto.schema';
import { MONGO_URI } from 'src/config/env';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    MongooseModule.forFeature([
      { name: 'Pedido', schema: PedidoSchema },
      { name: 'Item', schema: ItemSchema },
      { name: 'Categoria', schema: CategoriaSchema },
      { name: 'Produto', schema: ProdutoSchema },
    ]),
  ],
})
export class MongooseDbModule { }