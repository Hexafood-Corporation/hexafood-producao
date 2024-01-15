import { Test, TestingModule } from '@nestjs/testing';
import { FindPedidoByExternalPedidoIdUseCase } from '../find.pedido.by.external.pedido.id.usecase';
import { IPedidosRepository } from '../../../../domain/repository/pedidos.repository';
import { PedidoException } from '../../../exceptions/pedido.exception';
import { Pedido } from '../../../../../core/domain/entity/pedido.entity';
import { StatusPedido } from '../../../../../core/domain/enum/status-pedido.enum';

describe('FindPedidoByIdUseCase', () => {
  let findPedidoByExternalPedidoIdUseCase: FindPedidoByExternalPedidoIdUseCase;
  let pedidosRepository: IPedidosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPedidoByExternalPedidoIdUseCase,
        {
          provide: IPedidosRepository,
          useValue: {
            findByExternalPedidoId: jest.fn(),
          },
        },
      ],
    }).compile();

    findPedidoByExternalPedidoIdUseCase = module.get<FindPedidoByExternalPedidoIdUseCase>(FindPedidoByExternalPedidoIdUseCase);
    pedidosRepository = module.get<IPedidosRepository>(IPedidosRepository);
  });

  describe('findByExternalPedidoId', () => {
    it('should return the pedido when it exists', async () => {
      const external_pedido_id_mock = 1;
      const pedido: Partial<Pedido> = {
        external_pedido_id: external_pedido_id_mock,
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

      jest.spyOn(pedidosRepository, 'findByExternalPedidoId').mockResolvedValue(pedido as Pedido);

      const result = await findPedidoByExternalPedidoIdUseCase.findByExternalPedidoId(external_pedido_id_mock);

      expect(pedidosRepository.findByExternalPedidoId).toHaveBeenCalledWith(external_pedido_id_mock);
      expect(result).toEqual(pedido);
    });

    it('should throw an exception when the pedido does not exist', async () => {
      const external_pedido_id_mock = 1;

      jest.spyOn(pedidosRepository, 'findByExternalPedidoId').mockRejectedValue(new PedidoException('Pedido not found'));
      await expect(findPedidoByExternalPedidoIdUseCase.findByExternalPedidoId(external_pedido_id_mock)).rejects.toThrowError(PedidoException);
      expect(pedidosRepository.findByExternalPedidoId).toHaveBeenCalledWith(external_pedido_id_mock);
    });
  });
});