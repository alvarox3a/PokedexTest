import { Poke } from '../entities/poke';

export interface IFavoritesRepository {
    getFavoritesPokes(): Poke[];
    toggleFavorite(poke: Poke): void;
    isFavorite(poke: Poke): boolean;
}