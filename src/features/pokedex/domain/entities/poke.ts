export interface PokeStat {
    name: string;
    value: number;
}

export interface Poke {
    id: number;
    name: string;
    sprite: string;
    imageUrl: string;
    height: number;
    weight: number;
    types: string[];
    baseExperience: number;
    abilities: string[];
    stats: PokeStat[];
}
