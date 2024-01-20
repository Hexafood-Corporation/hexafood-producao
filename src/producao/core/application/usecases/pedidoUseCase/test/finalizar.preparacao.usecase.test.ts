import { Test, TestingModule } from '@nestjs/testing';
import { FinalizarPreparacaoPedidoUseCase } from '../finalizar.preparacao.usecase';
import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';
import { FindPedidoById } from '../find.pedido.by..id.usecase';
import { Pedido } from 'src/producao/core/domain/entity/pedido.entity';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';


describe('FinalizarPreparacaoPedidoUseCase', () => {
  let useCase: FinalizarPreparacaoPedidoUseCase;
  let pedidosRepository: IPedidosRepository;
  let findPedidoByIdUseCase: FindPedidoById;

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
          provide: FindPedidoById,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FinalizarPreparacaoPedidoUseCase>(
      FinalizarPreparacaoPedidoUseCase,
    );
    pedidosRepository = module.get<IPedidosRepository>(IPedidosRepository);
    findPedidoByIdUseCase = module.get<FindPedidoById>(
      FindPedidoById,
    );
  });

  describe('execute', () => {
    it('should update the status of the pedido to PRONTO', async () => {
      const id = 1;
      const pedido: Partial<Pedido> = {
        id: id,
        status: StatusPedido.EM_PREPARACAO,
      };
      const updatedPedido: Partial<Pedido> = {
        ...pedido,
        status: StatusPedido.PRONTO,
      };

      jest
        .spyOn(findPedidoByIdUseCase, 'findById')
        .mockResolvedValue(pedido as Pedido);
      jest
        .spyOn(pedidosRepository, 'update')
        .mockResolvedValue(updatedPedido as Pedido);

      const result = await useCase.execute(id);

      expect(result).toEqual(updatedPedido);
      expect(findPedidoByIdUseCase.findById).toHaveBeenCalledWith(id);
      expect(pedidosRepository.update).toHaveBeenCalledWith(id, updatedPedido);
    });
  });
});