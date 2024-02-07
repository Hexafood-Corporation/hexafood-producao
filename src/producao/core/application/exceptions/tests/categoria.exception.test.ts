import { CategoriaException } from '../categoria.exception';

describe('CategoriaException', () => {
  it('should create an instance of CategoriaException', () => {
    const message = 'Test message';
    const exception = new CategoriaException(message);
    expect(exception).toBeInstanceOf(CategoriaException);
    expect(exception.message).toBe(message);
    expect(exception.name).toBe('CategoriaException');
  });
});