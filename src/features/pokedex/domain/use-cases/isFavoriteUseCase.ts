import { Poke } from '../entities/poke';
import { IFavoritesRepository } from '../repositories/IFavoritesRepository';

export class IsFavoriteUseCase {
    constructor(private favoritesRepository: IFavoritesRepository) { }

    execute(poke: Poke): boolean {
        if (!poke) {
            throw new Error('El pokemon es requerido.');
        }
        return this.favoritesRepository.isFavorite(poke);
    }
}