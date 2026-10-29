import React, { useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePokemon } from '../hooks/usePoke';
import { PokemonItemMemo } from '../components/pokeItem';
import { POKEMON_LAYOUT } from '../constants/pokeLayout';
import { LAYOUT } from '../constants/layout';
import { Poke } from '../../domain/entities/poke';
import { THEME } from '../../../../core/theme/mainTheme';
import { PokedexLights } from '../components/pokedexLights';

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
        return <ActivityIndicator size="large" color="#fff" style={styles.footerLoader} />;
    }, [loading]);

    if (error) {
        return (
            <View style={[styles.screen, styles.centered]}>
                <View style={styles.bezel}>
                    <PokedexLights size={8} />
                    <View style={styles.errorScreen}>
                        <Text style={styles.errorTitle}>ERROR DE CONEXIÓN</Text>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    <Pressable
                        onPress={() => fetchPokemons(20, pokemons?.length ?? 0)}
                        accessibilityRole="button"
                        style={({ pressed }) => [styles.retryButton, pressed && styles.retryPressed]}
                    >
                        <Text style={styles.retryText}>REINTENTAR</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
    if (!pokemons && loading) {
        return (
            <View style={[styles.screen, styles.centered]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>BUSCANDO POKÉMON...</Text>
            </View>
        );
    }
    if (!pokemons && !loading) return null;

    return (
        <View style={styles.screen}>
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
    screen: {
        flex: 1,
        backgroundColor: THEME.red,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: LAYOUT.MARGIN,
        gap: 12,
    },
    container: {
        padding: LAYOUT.MARGIN,
        gap: LAYOUT.MARGIN,
    },
    columnWrapper: {
        gap: LAYOUT.MARGIN
    },
    footerLoader: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 2,
    },
    bezel: {
        alignSelf: 'stretch',
        alignItems: 'center',
        gap: 10,
        backgroundColor: THEME.bezel,
        borderRadius: 8,
        borderBottomLeftRadius: 40,
        borderWidth: 3,
        borderColor: THEME.dark,
        padding: LAYOUT.MARGIN,
    },
    errorScreen: {
        alignSelf: 'stretch',
        backgroundColor: THEME.screen,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: THEME.dark,
        padding: LAYOUT.MARGIN,
        gap: 6,
    },
    errorTitle: {
        color: THEME.darkRed,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 14,
        color: THEME.dark,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: THEME.yellow,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: THEME.dark,
    },
    retryPressed: {
        transform: [{ scale: 0.95 }],
    },
    retryText: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
    },
});