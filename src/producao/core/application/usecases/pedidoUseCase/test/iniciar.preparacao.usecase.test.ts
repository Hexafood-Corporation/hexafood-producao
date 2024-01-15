import { Test, TestingModule } from '@nestjs/testing';
import { IniciarPreparacaoPedidoUseCase } from '../iniciar.preparacao.usecase';
import { FindPedidoByExternalPedidoIdUseCase } from '../find.pedido.by.external.pedido.id.usecase';
import { IPedidosRepository } from '../../../../domain/repository/pedidos.repository';
import { StatusPedido } from '../../../../domain/enum/status-pedido.enum';
import { Pedido } from '../../../../domain/entity/pedido.entity';

describe('IniciarPreparacaoPedidoUseCase', () => {
  let iniciarPreparacaoPedidoUseCase: IniciarPreparacaoPedidoUseCase;
  let findByExternalPedidoIdUseCase: FindPedidoByExternalPedidoIdUseCase;
  let pedidosRepository: IPedidosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IniciarPreparacaoPedidoUseCase,
        {
          provide: FindPedidoByExternalPedidoIdUseCase,
          useValue: {
            findByExternalPedidoId: jest.fn(),
          },
        },
        {
          provide: IPedidosRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    iniciarPreparacaoPedidoUseCase = module.get<IniciarPreparacaoPedidoUseCase>(
      IniciarPreparacaoPedidoUseCase,
    );
    findByExternalPedidoIdUseCase = module.get<FindPedidoByExternalPedidoIdUseCase>(FindPedidoByExternalPedidoIdUseCase);
    pedidosRepository = module.get<IPedidosRepository>(IPedidosRepository);
  });

  describe('execute', () => {
    it('should update the status of the pedido to EM_PREPARACAO', async () => {
      const id = 1;
      const pedido: Partial<Pedido> = {
        external_pedido_id: 1,
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

      jest.spyOn(findByExternalPedidoIdUseCase, 'findByExternalPedidoId').mockResolvedValue(pedido as Pedido);
      jest.spyOn(pedidosRepository, 'update').mockResolvedValue(pedido);

      const result = await iniciarPreparacaoPedidoUseCase.execute(id);

      expect(findByExternalPedidoIdUseCase.findByExternalPedidoId).toHaveBeenCalledWith(id);
      expect(pedidosRepository.update).toHaveBeenCalledWith(id, {
        ...pedido,
        status: StatusPedido.EM_PREPARACAO,
      });
      expect(result).toEqual(pedido);
    });
  });
});