import { Test, TestingModule } from '@nestjs/testing';
import { FindPedidoById } from '../find.pedido.by..id.usecase';
import { IPedidosRepository } from '../../../../domain/repository/pedidos.repository';
import { PedidoException } from '../../../exceptions/pedido.exception';
import { Pedido } from '../../../../../core/domain/entity/pedido.entity';
import { StatusPedido } from '../../../../../core/domain/enum/status-pedido.enum';

describe('FindPedidoByIdUseCase', () => {
  let findPedidoByIdUseCase: FindPedidoById;
  let pedidosRepository: IPedidosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPedidoById,
        {
          provide: IPedidosRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    findPedidoByIdUseCase = module.get<FindPedidoById>(FindPedidoById);
    pedidosRepository = module.get<IPedidosRepository>(IPedidosRepository);
  });

  describe('findById', () => {
    it('should return the pedido when it exists', async () => {
      const id_pedido = 1;
      const pedido: Partial<Pedido> = {
        id: id_pedido,
        status: StatusPedido.EM_PREPARACAO,
        codigo_pedido: 'ABC123',
        valor_total: 10,
        itens: [
          {
            id: 1,
            quantidade: 1,
            valor: 10,
            id_produto: 1,
          },
        ],
      };

      jest.spyOn(pedidosRepository, 'findById').mockResolvedValue(pedido as Pedido);

      const result = await findPedidoByIdUseCase.findById(id_pedido);

      expect(pedidosRepository.findById).toHaveBeenCalledWith(id_pedido);
      expect(result).toEqual(pedido);
    });

    it('should throw an exception when the pedido does not exist', async () => {
      const id = 1;

      jest.spyOn(pedidosRepository, 'findById').mockRejectedValue(new PedidoException('Pedido not found'));
      await expect(findPedidoByIdUseCase.findById(id)).rejects.toThrowError(PedidoException);
      expect(pedidosRepository.findById).toHaveBeenCalledWith(id);
    });
  });
});