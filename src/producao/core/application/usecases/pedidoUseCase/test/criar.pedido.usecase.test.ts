import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';
import { CriarPedidoUseCase } from '../criar.pedido.usecase';
import { InputPedidoDTO } from '../pedido.dto';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';

describe('CriarPedidoUseCase', () => {
  let criarPedidoUseCase: CriarPedidoUseCase;
  let pedidosRepository: Partial<IPedidosRepository>;

  beforeEach(() => {
    pedidosRepository = {
      create: jest.fn(),
    };
    criarPedidoUseCase = new CriarPedidoUseCase(pedidosRepository as IPedidosRepository);
  });

  it('should create a new pedido', async () => {
    const inputPedido: InputPedidoDTO = {
        status: StatusPedido.INICIADO,
        id: 1000,
        itens: [
          {
            quantidade: 1,
            valor: 10,
            id_produto: 1,
          }
        ],
      }

    const createdPedido = {
      status: StatusPedido.INICIADO,
      id: 1000,
      itens: [
        {
          quantidade: 1,
          valor: 10,
          id_produto: 1,
        }
      ],
    };

    (pedidosRepository.create as jest.Mock).mockResolvedValue(inputPedido);

    const result = await criarPedidoUseCase.execute(inputPedido);

    expect(pedidosRepository.create).toHaveBeenCalledWith(inputPedido);
    expect(result).toEqual(createdPedido);
  });

  it('should throw an error when create a new pedido', async () => {
    const inputPedido: InputPedidoDTO = {
        status: StatusPedido.INICIADO,
        id: 1000,
        itens: [
          {
            quantidade: 1,
            valor: 10,
            id_produto: 1,
          }
        ],
      };

    (pedidosRepository.create as jest.Mock).mockRejectedValue(new Error('Error'));

    await expect(criarPedidoUseCase.execute(inputPedido)).rejects.toThrowError('Error');
  });
});