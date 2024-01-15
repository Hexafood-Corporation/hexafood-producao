import { InputPedidoDTO, OutputPedidoDTO, PedidoDTO } from '../pedido.dto';
import { CreateItemDTO } from '../item.dto';

describe('InputPedidoDTO', () => {
  it('should create an instance', () => {
    const pedidoDTO = new InputPedidoDTO();
    pedidoDTO.id = 1;
    pedidoDTO.id_cliente = 1;
    pedidoDTO.itens = [new CreateItemDTO()];
    expect(pedidoDTO).toBeDefined();
    expect(pedidoDTO).toHaveProperty('id');
    expect(pedidoDTO).toHaveProperty('id_cliente');
    expect(pedidoDTO).toHaveProperty('itens');
  });
});

describe('OutputPedidoDTO', () => {
  it('should create an instance', () => {
    const pedidoDTO = new OutputPedidoDTO();
    pedidoDTO.id = 1;
    pedidoDTO.id_cliente = 1;
    pedidoDTO.itens = [new CreateItemDTO()];
    expect(pedidoDTO).toBeDefined();
    expect(pedidoDTO).toHaveProperty('id');
    expect(pedidoDTO).toHaveProperty('id_cliente');
    expect(pedidoDTO).toHaveProperty('itens');
  });
});

describe('PedidoDTO', () => {
  it('should create an instance', () => {
    const pedidoDTO = new PedidoDTO();
    pedidoDTO.id = 1;
    pedidoDTO.id_cliente = 1;
    pedidoDTO.itens = [new CreateItemDTO()];
    expect(pedidoDTO).toBeDefined();
    expect(pedidoDTO).toHaveProperty('id');
    expect(pedidoDTO).toHaveProperty('id_cliente');
    expect(pedidoDTO).toHaveProperty('itens');
  });
});