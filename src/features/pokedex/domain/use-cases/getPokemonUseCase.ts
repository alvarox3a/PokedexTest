import { Poke } from '../entities/poke';
import { IPokeRepository } from '../repositories/IPokeRepository';

export class GetPokemonUseCase {
    constructor(private pokeRepository: IPokeRepository) { }

    async execute(identifier: string | number): Promise<Poke> {
        if (typeof identifier === 'string') {
            identifier = identifier.trim().toLowerCase();
            if (!identifier) throw new Error('El nombre del Pokemon no puede estar vacío.');
        } else if (identifier <= 0) {
            throw new Error('El ID del Pokemon debe ser mayor a 0.');
        }
        return await this.pokeRepository.getPokemon(identifier);
    }
}