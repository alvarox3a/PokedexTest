import { Poke } from '../entities/poke';
import { IFavoritesRepository } from '../repositories/IFavoritesRepository';

export class ToggleFavoriteUseCase {
    constructor(private favoritesRepository: IFavoritesRepository) { }

    execute(poke: Poke): void {
        if (!poke) {
            throw new Error('El pokemon es requerido.');
        }
        this.favoritesRepository.toggleFavorite(poke);
    }
}