import { InputCategoriaDto, OutputCategoriaDto } from "../categoria.dto";

describe('InputCategoriaDto', () => {
  it('should create an instance', () => {
    const categoriaDto = new InputCategoriaDto();
    categoriaDto.nome = 'Test Category';
    expect(categoriaDto).toBeDefined();
    expect(categoriaDto).toHaveProperty('nome');
  });
});

describe('OutputCategoriaDto', () => {
  it('should create an instance', () => {
    const categoriaDto = new OutputCategoriaDto();
    categoriaDto.id = 1;
    categoriaDto.nome = 'Test Category';
    expect(categoriaDto).toBeDefined();
    expect(categoriaDto).toHaveProperty('id');
    expect(categoriaDto).toHaveProperty('nome');
  });
});