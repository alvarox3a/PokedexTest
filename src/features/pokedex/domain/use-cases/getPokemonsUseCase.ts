import { Poke } from '../entities/poke';
import { IPokeRepository } from '../repositories/IPokeRepository';

export class GetPokemonsUseCase {
    constructor(private pokeRepository: IPokeRepository) { }

    async execute(limit: number, offset: number): Promise<Poke[]> {
        if (typeof limit === 'string') {
            limit = Number(limit);
        }
        if (typeof offset === 'string') {
            offset = Number(offset);
        }


        if (limit <= 0) throw new Error('El limite debe ser mayor a 0.');
        if (offset < 0) throw new Error('El offset debe ser mayor o igual a 0.');

        return await this.pokeRepository.getPokemons(limit, offset);
    }
}