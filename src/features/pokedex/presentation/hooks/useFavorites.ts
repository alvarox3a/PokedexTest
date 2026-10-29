import { useCallback, useEffect, useState } from 'react';
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

    const fetchFavorites = useCallback(() => {
        const result = getFavoritesUseCase.execute();
        setFavorites(result);
    }, []);

    const toggleFavorite = useCallback((poke: Poke) => {
        toggleFavoriteUseCase.execute(poke);
        fetchFavorites();
    }, [fetchFavorites]);

    const isFavorite = useCallback((poke: Poke) => {
        return isFavoriteUseCase.execute(poke);
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    return { favorites, fetchFavorites, toggleFavorite, isFavorite };
};