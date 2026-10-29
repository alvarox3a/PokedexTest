export const STAT_LABELS: Record<string, string> = {
    'hp': 'PS',
    'attack': 'ATQ',
    'defense': 'DEF',
    'special-attack': 'AT.E',
    'special-defense': 'DF.E',
    'speed': 'VEL',
};

// Valor base más alto entre todos los Pokémon (Blissey, 255 PS)
export const MAX_STAT_VALUE = 255;

export const formatPokeNumber = (id: number) => `#${id.toString().padStart(3, '0')}`;
