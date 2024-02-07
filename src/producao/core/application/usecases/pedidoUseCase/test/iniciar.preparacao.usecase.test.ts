import { Test, TestingModule } from '@nestjs/testing';
import { IniciarPreparacaoPedidoUseCase } from '../iniciar.preparacao.usecase';
import { FindPedidoById } from '../find.pedido.by..id.usecase';
import { IPedidosRepository } from 'src/producao/core/domain/repository/pedidos.repository';
import { Pedido } from 'src/producao/core/domain/entity/pedido.entity';
import { StatusPedido } from 'src/producao/core/domain/enum/status-pedido.enum';


describe('IniciarPreparacaoPedidoUseCase', () => {
  let iniciarPreparacaoPedidoUseCase: IniciarPreparacaoPedidoUseCase;
  let findPedidoIdUseCase: FindPedidoById;
  let pedidosRepository: IPedidosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IniciarPreparacaoPedidoUseCase,
        {
          provide: FindPedidoById,
          useValue: {
            findById: jest.fn(),
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
    findPedidoIdUseCase = module.get<FindPedidoById>(FindPedidoById);
    pedidosRepository = module.get<IPedidosRepository>(IPedidosRepository);
  });

  describe('execute', () => {
    it('should update the status of the pedido to EM_PREPARACAO', async () => {
      const id = 1;
      const pedido: Partial<Pedido> = {
        id: 1,
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

      jest.spyOn(findPedidoIdUseCase, 'findById').mockResolvedValue(pedido as Pedido);
      jest.spyOn(pedidosRepository, 'update').mockResolvedValue(pedido);

      const result = await iniciarPreparacaoPedidoUseCase.execute(id);

      expect(findPedidoIdUseCase.findById).toHaveBeenCalledWith(id);
      expect(pedidosRepository.update).toHaveBeenCalledWith(id, {
        ...pedido,
        status: StatusPedido.EM_PREPARACAO,
      });
      expect(result).toEqual(pedido);
    });
  });
});