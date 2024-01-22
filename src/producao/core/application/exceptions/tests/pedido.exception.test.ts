import { PedidoException } from "../pedido.exception";

describe('PedidoException', () => {
  it('should create an instance of PedidoException', () => {
    const message = 'Test message';
    const exception = new PedidoException(message);
    expect(exception).toBeInstanceOf(PedidoException);
    expect(exception.message).toBe(message);
    expect(exception.name).toBe('PedidoException');
  });
});