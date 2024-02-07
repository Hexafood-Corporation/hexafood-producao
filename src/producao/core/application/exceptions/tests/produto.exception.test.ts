import { ProdutoException } from '../produto.exception';

describe('ProdutoException', () => {
  it('should create an instance of ProdutoException', () => {
    const message = 'Test message';
    const exception = new ProdutoException(message);
    expect(exception).toBeInstanceOf(ProdutoException);
    expect(exception.message).toBe(message);
    expect(exception.name).toBe('ProdutoException');
  });
});