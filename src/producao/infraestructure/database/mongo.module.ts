import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from 'src/config/env';
import { CategoriaSchema } from 'src/producao/core/schemas/categoria.schema';
import { ItemSchema } from 'src/producao/core/schemas/item.schema';
import { PedidoSchema } from 'src/producao/core/schemas/pedido.schema';
import { ProdutoSchema } from 'src/producao/core/schemas/produto.schema';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI),
  MongooseModule.forFeature([
    { name: 'Pedido', schema: PedidoSchema },
    {name: 'Item', schema: ItemSchema},
    {name: 'Categoria', schema: CategoriaSchema},
    {name: 'Produto', schema: ProdutoSchema}
  ])],
})
export class MongooseDbModule { }