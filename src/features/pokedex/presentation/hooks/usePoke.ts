import { useState } from 'react';
import { Poke } from '../../domain/entities/poke';
import { GetPokemonUseCase } from '../../domain/use-cases/getPokemonUseCase';
import { PokemonRepositoryImpl } from '../../domain/repositories/PokeRepositoryImp';
import { PokeDataSource } from '../../data/datasources/pokeDataSource';
import { GetPokemonsUseCase } from '../../domain/use-cases/getPokemonsUseCase';

const dataSource = new PokeDataSource();
const repository = new PokemonRepositoryImpl(dataSource);
const getPokemonUseCase = new GetPokemonUseCase(repository);
const getPokemonsUseCase = new GetPokemonsUseCase(repository);

export const usePokemon = () => {
    const [pokemons, setPokemons] = useState<Poke[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPokemon = async (identifier: string | number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await getPokemonUseCase.execute(identifier);
            return result;
        } catch (err: any) {
            setError(err.message || 'Ocurrio un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemons = async (limit: number, offset: number) => {
        setError(null);
        setLoading(true);
        try {
            const result = await getPokemonsUseCase.execute(limit, offset);
            setPokemons(prev => {
                if (offset > 0 && prev) {
                    const filteredResult = result.filter(
                        newItem => !prev.some(prevItem => prevItem.id === newItem.id)
                    );
                    return [...prev, ...filteredResult];
                }
                return result;
            });
        } catch (err: any) {
            setError(err.message || 'Ocurrio un error inesperado');
        } finally {
            setLoading(false);
        }
    }

    return { pokemons, loading, error, fetchPokemon, fetchPokemons };
};