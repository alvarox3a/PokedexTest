import { PokemonRepositoryImpl } from '../../src/features/pokedex/domain/repositories/PokeRepositoryImp';
import { PokeDataSource } from '../../src/features/pokedex/data/datasources/pokeDataSource';
import { PokeDto } from '../../src/features/pokedex/data/dtos/pokeDto';

// Mock del PokeDataSource
jest.mock('../../src/features/pokedex/data/datasources/pokeDataSource');

describe('PokemonRepositoryImpl', () => {
  let repository: PokemonRepositoryImpl;
  let mockDataSource: jest.Mocked<PokeDataSource>;

  const mockPokeDto: PokeDto = {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    height: 4, // 4 decímetros -> 0.4 metros
    weight: 60, // 60 hectogramos -> 6.0 kg
    sprites: {
      front_default: 'https://example.com/25.png',
      other: { 'official-artwork': { front_default: 'https://example.com/artwork/25.png' } },
    },
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  };

  beforeEach(() => {
    mockDataSource = new PokeDataSource() as jest.Mocked<PokeDataSource>;
    repository = new PokemonRepositoryImpl(mockDataSource);
  });

  describe('getPokemon', () => {
    it('debería retornar un objeto de dominio Poke mapeado correctamente', async () => {
      mockDataSource.getPokemonByIdOrName.mockResolvedValueOnce(mockPokeDto);

      const result = await repository.getPokemon(25);

      expect(mockDataSource.getPokemonByIdOrName).toHaveBeenCalledWith(25);
      expect(result).toEqual({
        id: 25,
        name: 'Pikachu', // Capitalizado por el mapper
        sprite: 'https://example.com/25.png',
        imageUrl: 'https://example.com/artwork/25.png',
        height: 0.4,
        weight: 6.0,
        types: ['electric'],
      });
    });

    it('debería lanzar un error descriptivo si el data source falla', async () => {
      mockDataSource.getPokemonByIdOrName.mockRejectedValueOnce(new Error('Network Error'));

      await expect(repository.getPokemon(25)).rejects.toThrow(
        'No se pudo obtener la informacion del Pokemon desde el servidor.'
      );
    });
  });

  describe('getPokemons', () => {
    it('debería retornar una lista de objetos de dominio Poke mapeados', async () => {
      mockDataSource.getPokemons.mockResolvedValueOnce([mockPokeDto]);

      const result = await repository.getPokemons(20, 0);

      expect(mockDataSource.getPokemons).toHaveBeenCalledWith(20, 0);
      expect(result).toEqual([{
        id: 25,
        name: 'Pikachu',
        sprite: 'https://example.com/25.png',
        imageUrl: 'https://example.com/artwork/25.png',
        height: 0.4,
        weight: 6.0,
        types: ['electric'],
      }]);
    });

    it('debería lanzar un error descriptivo si el data source falla al listar', async () => {
      mockDataSource.getPokemons.mockRejectedValueOnce(new Error('Network Error'));

      await expect(repository.getPokemons(20, 0)).rejects.toThrow(
        'No se pudo obtener la informacion de los Pokemon desde el servidor.'
      );
    });
  });
});
