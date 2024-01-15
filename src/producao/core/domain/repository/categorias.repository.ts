import { Categoria } from 'src/producao/core/domain/entity/categoria.entity';
import { InputCategoriaDto, OutputCategoriaDto } from '../../application/usecases/categoriaUseCase/categoria.dto';

export const ICategoriasRepository = 'ICategoriasRepository';

export interface ICategoriasRepository {
  create(createCategoriaDto: Categoria);

  findOne(id : number);

  findAll(): Promise<OutputCategoriaDto[]>;

  findByName(name: string): Promise<Categoria>;

  update(id: number, updateCategoriaDto: InputCategoriaDto);

  remove(id: number);
}
