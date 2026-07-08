import React, { useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePokemon } from '../hooks/usePoke';
import { PokemonItemMemo } from '../components/pokeItem';
import { POKEMON_LAYOUT } from '../constants/pokeLayout';
import { LAYOUT } from '../constants/layout';
import { Poke } from '../../domain/entities/poke';
import { THEME } from '../../../../core/theme/mainTheme';

const keyExtractor = (item: Poke) => item.id.toString();

export const PokemonScreen = () => {
    const { pokemons, loading, error, fetchPokemons } = usePokemon();
    const navigation = useNavigation();

    useEffect(() => {
        fetchPokemons(20, 0);
    }, []);

    const renderItem = useCallback(({ item }: { item: Poke }) => (
        <PokemonItemMemo
            pokemon={item}
            onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
        />
    ), [navigation]);

    const handleLoadMore = useCallback(() => {
        if (pokemons && !loading) {
            fetchPokemons(20, pokemons.length);
        }
    }, [pokemons, loading]);

    const renderFooter = useCallback(() => {
        if (!loading) return null;
        return <ActivityIndicator size="large" style={{ marginVertical: 20 }} />;
    }, [loading]);

    if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;
    if (!pokemons && loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    if (!pokemons && !loading) return null;

    return (
        <View style={{ flex: 1, backgroundColor: THEME.red }}>
            <FlatList
                data={pokemons}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
                numColumns={POKEMON_LAYOUT.NUM_COLUMNS}
                columnWrapperStyle={styles.columnWrapper}
                getItemLayout={(_data, index) => ({
                    length: POKEMON_LAYOUT.CARD_HEIGHT + LAYOUT.MARGIN,
                    offset: index * (POKEMON_LAYOUT.CARD_HEIGHT + LAYOUT.MARGIN),
                    index
                })}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={50}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: LAYOUT.MARGIN,
        gap: LAYOUT.MARGIN,
    },
    columnWrapper: {
        gap: LAYOUT.MARGIN
    }
});