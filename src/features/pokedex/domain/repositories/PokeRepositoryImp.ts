import { IPokeRepository } from '../repositories/IPokeRepository';
import { Poke } from '../entities/poke';
import { PokeDataSource } from '../../data/datasources/pokeDataSource';
import { PokeMapper } from '../../data/mappers/pokeMapper';

export class PokemonRepositoryImpl implements IPokeRepository {

    constructor(private remoteDataSource: PokeDataSource) { }
    async getPokemon(identifier: string | number): Promise<Poke> {
        try {

            const pokemonDto = await this.remoteDataSource.getPokemonByIdOrName(identifier);

            const pokemonEntity = PokeMapper.toDomain(pokemonDto);
            return pokemonEntity;
        } catch (error) {
            throw new Error('No se pudo obtener la informacion del Pokemon desde el servidor.');
        }
    }

    async getPokemons(limit: number, offset: number): Promise<Poke[]> {
        try {

            const pokemonsDto = await this.remoteDataSource.getPokemons(limit, offset);

            const pokemonsEntities = pokemonsDto.map(pokemonDto => PokeMapper.toDomain(pokemonDto));

            return pokemonsEntities;
        } catch (error) {
            throw new Error('No se pudo obtener la informacion de los Pokemon desde el servidor.');
        }
    }
}