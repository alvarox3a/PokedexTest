import { PokeDataSource } from '../../src/features/pokedex/data/datasources/pokeDataSource';

// Re-mock fetch per test (global mock is set in setup.js)
const mockFetch = globalThis.fetch as jest.Mock;

// Mock del storage de MMKV
jest.mock('../../src/storage/mmkv', () => ({
  storage: {
    getString: jest.fn(),
    set: jest.fn(),
  },
}));

import { storage } from '../../src/storage/mmkv';
const mockStorage = storage as jest.Mocked<typeof storage>;

describe('PokeDataSource', () => {
  let dataSource: PokeDataSource;

  const mockPokemonResponse = {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    height: 4,
    weight: 60,
    sprites: {
      front_default: 'https://example.com/25.png',
      other: { 'official-artwork': { front_default: 'https://example.com/artwork/25.png' } },
    },
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
    abilities: [{ is_hidden: false, slot: 1, ability: { name: 'lightning-rod', url: '' } }],
    stats: [
      { base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } },
      { base_stat: 90, effort: 2, stat: { name: 'speed', url: '' } },
    ],
  };

  const mockPokemonListResponse = {
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
    ]
  };

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    dataSource = new PokeDataSource();
    mockFetch.mockClear();
    (mockStorage.getString as jest.Mock).mockReset();
    (mockStorage.set as jest.Mock).mockClear();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('getPokemonByIdOrName', () => {
    it('debería hacer fetch a la API con el identificador correcto', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonResponse),
      });

      const result = await dataSource.getPokemonByIdOrName(25);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');
      expect(result.id).toBe(25);
      expect(result.name).toBe('pikachu');
    });

    it('debería hacer fetch con nombre de Pokémon', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonResponse),
      });

      await dataSource.getPokemonByIdOrName('pikachu');

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
    });

    it('debería lanzar un error si la respuesta de fetch no es ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(dataSource.getPokemonByIdOrName('unknown')).rejects.toThrow(
        'No se pudo obtener la informacion del Pokemon desde el servidor.'
      );
    });
  });

  describe('getPokemons', () => {
    it('debería retornar datos del cache si existen', async () => {
      const cachedList = [mockPokemonResponse];
      mockStorage.getString.mockReturnValueOnce(JSON.stringify(cachedList));

      const result = await dataSource.getPokemons(20, 0);

      expect(mockStorage.getString).toHaveBeenCalledWith('POKES-20-0');
      expect(mockFetch).not.toHaveBeenCalled();
      expect(result).toEqual(cachedList);
    });

    it('debería hacer fetch si no hay datos en cache, guardar en cache y retornar resultados', async () => {
      mockStorage.getString.mockReturnValueOnce(undefined);
      
      // Primera llamada: obtener lista
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonListResponse),
      });

      // Segunda llamada: obtener detalle de pikachu (llamada desde results.map)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonResponse),
      });

      const result = await dataSource.getPokemons(20, 0);

      expect(mockStorage.getString).toHaveBeenCalledWith('POKES-20-0');
      expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://pokeapi.co/api/v2/pokemon/pikachu');
      expect(mockStorage.set).toHaveBeenCalledWith('POKES-20-0', JSON.stringify([mockPokemonResponse]));
      expect(result).toEqual([mockPokemonResponse]);
    });

    it('debería lanzar un error si el fetch de la lista falla', async () => {
      mockStorage.getString.mockReturnValueOnce(undefined);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(dataSource.getPokemons(20, 0)).rejects.toThrow(
        'No se pudo obtener la informacion de los Pokemon desde el servidor.'
      );
    });
  });
});
