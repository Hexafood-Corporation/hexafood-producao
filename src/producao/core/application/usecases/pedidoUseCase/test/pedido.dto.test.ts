import { InputPedidoDTO, OutputPedidoDTO, PedidoDTO } from '../pedido.dto';
import { CreateItemDTO } from '../item.dto';

describe('InputPedidoDTO', () => {
  it('should create an instance', () => {
    const pedidoDTO = new InputPedidoDTO();
    pedidoDTO.external_pedido_id = 1;
    pedidoDTO.external_id_cliente = 1;
    pedidoDTO.itens = [new CreateItemDTO()];
    expect(pedidoDTO).toBeDefined();
    expect(pedidoDTO).toHaveProperty('external_pedido_id');
    expect(pedidoDTO).toHaveProperty('external_id_cliente');
    expect(pedidoDTO).toHaveProperty('itens');
  });
});

describe('OutputPedidoDTO', () => {
  it('should create an instance', () => {
    const pedidoDTO = new OutputPedidoDTO();
    pedidoDTO.external_pedido_id = 1;
    pedidoDTO.external_id_cliente = 1;
    pedidoDTO.itens = [new CreateItemDTO()];
    expect(pedidoDTO).toBeDefined();
    expect(pedidoDTO).toHaveProperty('external_pedido_id');
    expect(pedidoDTO).toHaveProperty('external_id_cliente');
    expect(pedidoDTO).toHaveProperty('itens');
  });
});

describe('PedidoDTO', () => {
  it('should create an instance', () => {
    const pedidoDTO = new PedidoDTO();
    pedidoDTO.external_pedido_id = 1;
    pedidoDTO.external_id_cliente = 1;
    pedidoDTO.itens = [new CreateItemDTO()];
    expect(pedidoDTO).toBeDefined();
    expect(pedidoDTO).toHaveProperty('external_pedido_id');
    expect(pedidoDTO).toHaveProperty('external_id_cliente');
    expect(pedidoDTO).toHaveProperty('itens');
  });
});