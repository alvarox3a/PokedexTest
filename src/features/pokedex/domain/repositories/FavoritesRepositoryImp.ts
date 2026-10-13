import { IFavoritesRepository } from '../repositories/IFavoritesRepository';
import { Poke } from '../entities/poke';
import { FavoritesDataSource } from '../../data/datasources/favoritesDataSource';

export class FavoritesRepositoryImpl implements IFavoritesRepository {

    constructor(private remoteDataSource: FavoritesDataSource) { }
    getFavoritesPokes(): Poke[] {
        try {

            const pokes = this.remoteDataSource.getFavoritesPokes();

            return pokes;
        } catch (error) {
            throw new Error('No se pudo obtener la informacion del Pokemon desde el servidor.');
        }
    }

    toggleFavorite(poke: Poke): void {
        try {

            const pokes = this.remoteDataSource.getFavoritesPokes();

            if (pokes.find(p => p.id === poke.id)) {
                pokes.splice(pokes.findIndex(p => p.id === poke.id), 1);
            } else {
                pokes.push(poke);
            }

            this.remoteDataSource.saveFavoritesPokes(pokes);
        } catch (error) {
            throw new Error('No se pudo obtener la informacion del Pokemon desde el servidor.');
        }
    }

    isFavorite(poke: Poke): boolean {
        try {
            return this.remoteDataSource.isFavorite(poke);
        } catch (error) {
            throw new Error('No se pudo obtener la informacion del Pokemon desde el servidor.');
        }
    }
}