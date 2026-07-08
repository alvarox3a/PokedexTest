import { PokeMapper } from '../../../../../src/features/pokedex/data/mappers/pokeMapper';
import { PokeDto } from '../../../../../src/features/pokedex/data/dtos/pokeDto';

describe('PokeMapper', () => {
  const mockPokeDto: PokeDto = {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    height: 4, // 4 decímetros -> 0.4 m
    weight: 60, // 60 hectogramos -> 6 kg
    sprites: {
      front_default: 'https://example.com/25.png',
      other: { 'official-artwork': { front_default: 'https://example.com/artwork/25.png' } },
    },
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  };

  it('debería mapear correctamente un DTO completo al modelo de dominio', () => {
    const result = PokeMapper.toDomain(mockPokeDto);

    expect(result.id).toBe(25);
    expect(result.name).toBe('Pikachu'); // Capitalizado
    expect(result.sprite).toBe('https://example.com/25.png');
    expect(result.imageUrl).toBe('https://example.com/artwork/25.png');
    expect(result.height).toBe(0.4);
    expect(result.weight).toBe(6.0);
    expect(result.types).toEqual(['electric']);
  });

  it('debería manejar la ausencia de sprite predeterminado y de artwork oficial', () => {
    const minPokeDto: PokeDto = {
      id: 1,
      name: 'bulbasaur',
      base_experience: 64,
      height: 7,
      weight: 69,
      sprites: {
        front_default: null,
      },
      types: [{ slot: 1, type: { name: 'grass', url: '' } }],
    };

    const result = PokeMapper.toDomain(minPokeDto);

    expect(result.sprite).toBe('');
    expect(result.imageUrl).toBe('');
  });
});
