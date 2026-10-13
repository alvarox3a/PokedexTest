import { Poke } from '../entities/poke';
import { IFavoritesRepository } from '../repositories/IFavoritesRepository';

export class GetFavoritesUseCase {
    constructor(private favoritesRepository: IFavoritesRepository) { }

    execute(): Poke[] {
        return this.favoritesRepository.getFavoritesPokes();
    }
}