import { useEffect, useState } from 'react';
import { Poke } from '../../domain/entities/poke';
import { FavoritesDataSource } from '../../data/datasources/favoritesDataSource';
import { FavoritesRepositoryImpl } from '../../domain/repositories/FavoritesRepositoryImp';
import { GetFavoritesUseCase } from '../../domain/use-cases/getFavoritesUseCase';
import { ToggleFavoriteUseCase } from '../../domain/use-cases/toggleFavoriteUseCase';
import { IsFavoriteUseCase } from '../../domain/use-cases/isFavoriteUseCase';

const dataSource = new FavoritesDataSource();
const repository = new FavoritesRepositoryImpl(dataSource);
const getFavoritesUseCase = new GetFavoritesUseCase(repository);
const toggleFavoriteUseCase = new ToggleFavoriteUseCase(repository);
const isFavoriteUseCase = new IsFavoriteUseCase(repository);

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Poke[]>([]);

    const fetchFavorites = () => {
        const result = getFavoritesUseCase.execute();
        setFavorites(result);
    }

    const toggleFavorite = (poke: Poke) => {
        toggleFavoriteUseCase.execute(poke);
        fetchFavorites();
    }

    const isFavorite = (poke: Poke) => {
        return isFavoriteUseCase.execute(poke);
    }

    useEffect(() => {
        fetchFavorites();
    }, []);

    return { favorites, fetchFavorites, toggleFavorite, isFavorite };
};