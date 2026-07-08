import { Poke } from '../entities/poke';

export interface IPokeRepository {
    getPokemon(identifier: string | number): Promise<Poke>;
    getPokemons(limit: number, offset: number): Promise<Poke[]>;
}