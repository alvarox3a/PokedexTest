
import { storage } from '../../../../storage/mmkv';
import { STORAGE_KEYS } from '../../../../core/constants/storage';
import { Poke } from '../../domain/entities/poke';

export class FavoritesDataSource {
    getFavoritesPokes(): Poke[] {
        const cachedData = storage.getString(STORAGE_KEYS.favorites);
        console.log(cachedData)
        if (cachedData) {
            // Los favoritos guardados antes de agregar estos campos no los tienen
            return JSON.parse(cachedData).map((poke: Partial<Poke>) => ({
                baseExperience: 0,
                abilities: [],
                stats: [],
                ...poke,
            }) as Poke);
        }
        return [];
    }
    saveFavoritesPokes(pokes: Poke[]): void {
        storage.set(STORAGE_KEYS.favorites, JSON.stringify(pokes));
    }
    isFavorite(poke: Poke): boolean {
        const favorites = this.getFavoritesPokes();
        return favorites.some(fav => fav.id === poke.id);
    }
}