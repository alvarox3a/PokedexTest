import { GetPokemonsUseCase } from '../../src/features/pokedex/domain/use-cases/getPokemonsUseCase';
import { IPokeRepository } from '../../src/features/pokedex/domain/repositories/IPokeRepository';
import { Poke } from '../../src/features/pokedex/domain/entities/poke';

describe('GetPokemonsUseCase', () => {
  let useCase: GetPokemonsUseCase;
  let mockRepository: jest.Mocked<IPokeRepository>;

  const mockPokemons: Poke[] = [
    {
      id: 25,
      name: 'Pikachu',
      sprite: 'https://example.com/sprite.png',
      imageUrl: 'https://example.com/artwork.png',
      height: 0.4,
      weight: 6.0,
      types: ['electric'],
    }
  ];

  beforeEach(() => {
    mockRepository = {
      getPokemon: jest.fn(),
      getPokemons: jest.fn(),
    };
    useCase = new GetPokemonsUseCase(mockRepository);
  });

  it('debería lanzar un error si el límite es menor o igual a 0', async () => {
    await expect(useCase.execute(0, 0)).rejects.toThrow('El limite debe ser mayor a 0.');
    await expect(useCase.execute(-10, 0)).rejects.toThrow('El limite debe ser mayor a 0.');
    expect(mockRepository.getPokemons).not.toHaveBeenCalled();
  });

  it('debería lanzar un error si el offset es menor a 0', async () => {
    await expect(useCase.execute(20, -1)).rejects.toThrow('El offset debe ser mayor o igual a 0.');
    expect(mockRepository.getPokemons).not.toHaveBeenCalled();
  });

  it('debería convertir parámetros de tipo string a number y llamar al repositorio', async () => {
    mockRepository.getPokemons.mockResolvedValueOnce(mockPokemons);

    // Usando cast a any para enviar tipos de string simulados si la firma no lo permitiera por tipado
    const result = await useCase.execute('20' as any, '10' as any);

    expect(mockRepository.getPokemons).toHaveBeenCalledWith(20, 10);
    expect(result).toEqual(mockPokemons);
  });

  it('debería llamar al repositorio con el limit y offset especificados', async () => {
    mockRepository.getPokemons.mockResolvedValueOnce(mockPokemons);

    const result = await useCase.execute(20, 10);

    expect(mockRepository.getPokemons).toHaveBeenCalledWith(20, 10);
    expect(result).toEqual(mockPokemons);
  });
});
