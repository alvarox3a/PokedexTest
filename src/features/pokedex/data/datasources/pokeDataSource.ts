import { PokeDto } from '../dtos/pokeDto';
import { storage } from '../../../../storage/mmkv';
import { STORAGE_KEYS } from '../../../../core/constants/storage';

export class PokeDataSource {
    private baseUrl = 'https://pokeapi.co/api/v2';

    async getPokemonByIdOrName(identifier: string | number): Promise<PokeDto> {
        try {

            const response = await fetch(`${this.baseUrl}/pokemon/${identifier}`);

            if (!response.ok) {
                throw new Error(`Error al buscar el Pokemon: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo obtener la informacion del Pokemon desde el servidor.');
        }
    }

    async getPokemons(limit: number, offset: number): Promise<PokeDto[]> {
        try {

            const cacheKey = `${STORAGE_KEYS.pokes}-${limit}-${offset}`;

            const cachedData = storage.getString(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }

            const response = await fetch(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);

            if (!response.ok) {
                throw new Error(`Error al buscar los Pokemon: ${response.statusText}`);
            }

            const pokes = await response.json();

            const requests = pokes.results.map((pokemon: { name: string, url: string }) =>
                this.getPokemonByIdOrName(pokemon.name)
            );

            const pokemonsData = await Promise.all(requests);

            storage.set(cacheKey, JSON.stringify(pokemonsData));

            return pokemonsData;

        } catch (error) {
            console.log(error);
            throw new Error('No se pudo obtener la informacion de los Pokemon desde el servidor.');
        }
    }
}