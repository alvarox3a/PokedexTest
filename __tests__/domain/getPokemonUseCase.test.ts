import { GetPokemonUseCase } from '../../src/features/pokedex/domain/use-cases/getPokemonUseCase';
import { IPokeRepository } from '../../src/features/pokedex/domain/repositories/IPokeRepository';
import { Poke } from '../../src/features/pokedex/domain/entities/poke';

describe('GetPokemonUseCase', () => {
  let useCase: GetPokemonUseCase;
  let mockRepository: jest.Mocked<IPokeRepository>;

  const mockPokemon: Poke = {
    id: 25,
    name: 'Pikachu',
    sprite: 'https://example.com/sprite.png',
    imageUrl: 'https://example.com/artwork.png',
    height: 0.4,
    weight: 6.0,
    types: ['electric'],
  };

  beforeEach(() => {
    mockRepository = {
      getPokemon: jest.fn(),
      getPokemons: jest.fn(),
    };
    useCase = new GetPokemonUseCase(mockRepository);
  });

  it('debería lanzar un error si el nombre del Pokémon está vacío', async () => {
    await expect(useCase.execute('')).rejects.toThrow('El nombre del Pokemon no puede estar vacío.');
    await expect(useCase.execute('   ')).rejects.toThrow('El nombre del Pokemon no puede estar vacío.');
    expect(mockRepository.getPokemon).not.toHaveBeenCalled();
  });

  it('debería lanzar un error si el ID del Pokémon es menor o igual a 0', async () => {
    await expect(useCase.execute(0)).rejects.toThrow('El ID del Pokemon debe ser mayor a 0.');
    await expect(useCase.execute(-5)).rejects.toThrow('El ID del Pokemon debe ser mayor a 0.');
    expect(mockRepository.getPokemon).not.toHaveBeenCalled();
  });

  it('debería normalizar el identificador de texto (recortar y minúsculas) y llamar al repositorio', async () => {
    mockRepository.getPokemon.mockResolvedValueOnce(mockPokemon);

    const result = await useCase.execute('  PIKACHU  ');

    expect(mockRepository.getPokemon).toHaveBeenCalledWith('pikachu');
    expect(result).toEqual(mockPokemon);
  });

  it('debería llamar al repositorio con el ID correcto', async () => {
    mockRepository.getPokemon.mockResolvedValueOnce(mockPokemon);

    const result = await useCase.execute(25);

    expect(mockRepository.getPokemon).toHaveBeenCalledWith(25);
    expect(result).toEqual(mockPokemon);
  });
});
