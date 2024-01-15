import { Test, TestingModule } from '@nestjs/testing';
import { FinalizarPreparacaoPedidoUseCase } from '../finalizar.preparacao.usecase';
import { IPedidosRepository } from '../../../../../core/domain/repository/pedidos.repository';
import { FindPedidoByExternalPedidoIdUseCase } from '../find.pedido.by.external.pedido.id.usecase';
import { Pedido } from '../../../../../core/domain/entity/pedido.entity';
import { StatusPedido } from '../../../../../core/domain/enum/status-pedido.enum';

describe('FinalizarPreparacaoPedidoUseCase', () => {
  let useCase: FinalizarPreparacaoPedidoUseCase;
  let pedidosRepository: IPedidosRepository;
  let findPedidoByIdUseCase: FindPedidoByExternalPedidoIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinalizarPreparacaoPedidoUseCase,
        {
          provide: IPedidosRepository,
          useValue: {
            update: jest.fn(),
          },
        },
        {
          provide: FindPedidoByExternalPedidoIdUseCase,
          useValue: {
            findByExternalPedidoId: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FinalizarPreparacaoPedidoUseCase>(
      FinalizarPreparacaoPedidoUseCase,
    );
    pedidosRepository = module.get<IPedidosRepository>(IPedidosRepository);
    findPedidoByIdUseCase = module.get<FindPedidoByExternalPedidoIdUseCase>(
      FindPedidoByExternalPedidoIdUseCase,
    );
  });

  describe('execute', () => {
    it('should update the status of the pedido to PRONTO', async () => {
      const id = 1;
      const pedido: Partial<Pedido> = {
        external_pedido_id: id,
        status: StatusPedido.EM_PREPARACAO,
      };
      const updatedPedido: Partial<Pedido> = {
        ...pedido,
        status: StatusPedido.PRONTO,
      };

      jest
        .spyOn(findPedidoByIdUseCase, 'findByExternalPedidoId')
        .mockResolvedValue(pedido as Pedido);
      jest
        .spyOn(pedidosRepository, 'update')
        .mockResolvedValue(updatedPedido as Pedido);

      const result = await useCase.execute(id);

      expect(result).toEqual(updatedPedido);
      expect(findPedidoByIdUseCase.findByExternalPedidoId).toHaveBeenCalledWith(id);
      expect(pedidosRepository.update).toHaveBeenCalledWith(id, updatedPedido);
    });
  });
});