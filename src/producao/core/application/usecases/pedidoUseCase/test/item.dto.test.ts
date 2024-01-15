import { CreateItemDTO, DetailItemDTO } from '../item.dto';

describe('CreateItemDTO', () => {
  it('should create a new instance', () => {
    const createItemDTO = new CreateItemDTO();
    expect(createItemDTO).toBeDefined();
  });

  it('should have properties quantidade, valor, and id_produto', () => {
    const createItemDTO = new CreateItemDTO();
    createItemDTO.id_produto = 1;
    createItemDTO.quantidade = 1;
    createItemDTO.valor = 10; 
    expect(createItemDTO).toHaveProperty('quantidade');
    expect(createItemDTO).toHaveProperty('valor');
    expect(createItemDTO).toHaveProperty('id_produto');
  });
});

describe('DetailItemDTO', () => {
  it('should create a new instance', () => {
    const detailItemDTO = new DetailItemDTO();
    expect(detailItemDTO).toBeDefined();
  });

  it('should have properties quantidade, valor, and id_produto', () => {
    const detailItemDTO = new DetailItemDTO();
    detailItemDTO.id_produto = 1;
    detailItemDTO.quantidade = 1;
    detailItemDTO.valor = 10;
    expect(detailItemDTO).toHaveProperty('quantidade');
    expect(detailItemDTO).toHaveProperty('valor');
    expect(detailItemDTO).toHaveProperty('id_produto');
  });
});