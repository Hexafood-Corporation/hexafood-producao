import { ReceberPedidoUseCase } from '../receber.pedido.usecase';
import { CriarPedidoUseCase } from '../criar.pedido.usecase';
import { InputPedidoDTO } from '../pedido.dto';
import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';

describe('ReceberPedidoUseCase', () => {
  let receberPedidoUseCase: ReceberPedidoUseCase;
  let criarPedidoUseCase: CriarPedidoUseCase;
  let pedidosRepository: Partial<IPedidosRepository>;

  beforeEach(() => {
    pedidosRepository = {
      create: jest.fn(),
    };
    receberPedidoUseCase = new ReceberPedidoUseCase(pedidosRepository as IPedidosRepository);
    criarPedidoUseCase = new CriarPedidoUseCase(pedidosRepository as IPedidosRepository);
  });

  it('should receive a pedido', async () => {
    const pedidoInput: InputPedidoDTO = {
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

    const pedidoRecebido = {
      status: StatusPedido.RECEBIDO,
      external_pedido_id: 1000,
      itens: [
        {
          quantidade: 1,
          valor: 10,
          external_id_produto: 1,
        }
      ],
    };

    if (typeof pedidosRepository.create === 'function') {
      (pedidosRepository.create as jest.Mock).mockResolvedValue(pedidoRecebido);
      await criarPedidoUseCase.execute(pedidoInput);
      const result = await receberPedidoUseCase.execute(pedidoInput);

      expect(pedidosRepository.create).toHaveBeenCalledWith(pedidoInput);
      expect(result).toEqual({
        ...pedidoRecebido,
        status: StatusPedido.RECEBIDO,
      });
    } else {
      throw new Error('Method create not found in pedidosRepository');
    }
  });
});